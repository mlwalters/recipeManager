using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<RecipeController> _logger;

        public RecipeController(AppDbContext context, ILogger<RecipeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        [Route("All/{email}")]
        public async Task<IActionResult> Get(string email)
        {
            try
            {
                var recipes = await _context.Recipes
                .Include(ins => ins.Instructions)
                .Include(ing => ing.Ingredients)
                .Include(c => c.Category)
                .Where(r => r.UserEmail == email)
                .ToListAsync();

                var recipeResponses = recipes.Select(r => new RecipeResponse(r));
                return Ok(recipeResponses);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"SQL Read error. It is likely that there is no database connection established. ${e.Message}");
                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var recipe = await _context.Recipes
                .Include(ins => ins.Instructions)
                .Include(ing => ing.Ingredients)
                .Include(r => r.Category)
                .FirstOrDefaultAsync(recipe => recipe.Id == id);

                return recipe is not null ? Ok(new RecipeResponse(recipe)) : new NotFoundResult();
            }
            catch (Exception e)
            {
                _logger.LogCritical($"SQL Read error. It is likely that there is no database connection established. ${e.Message}");
                throw;
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AddRecipe addRecipe)
        {
            var items = await _context.Items.ToListAsync();
            var instructions = addRecipe.Instructions.Select(ins => new Instruction
            {
                Step = ins.Step.Trim(),
            }).ToList();

            var ingredients = addRecipe.Ingredients.Select(ing => new Ingredient
            {
                Item = items.FirstOrDefault(i => i.ItemName.Trim().ToLower() == ing.Item.Trim().ToLower(), new Item { ItemName = ing.Item.Trim().ToLower() }),
                Amount = ing.Amount.Trim().ToLower(),
            }).ToList();

            Recipe newRecipe = new Recipe()
            {
                Name = addRecipe.Name,
                Description = addRecipe.Description,
                ImageUrl = addRecipe.ImageUrl,
                ServingSize = addRecipe.ServingSize,
                CategoryId = addRecipe.Category,
                Notes = addRecipe.Notes,
                Instructions = instructions,
                Ingredients = ingredients,
                UserEmail = addRecipe.UserEmail
            };

            _context.Recipes.Add(newRecipe);
            await _context.SaveChangesAsync();

            var addedRecipe = await _context.Recipes
            .Include(ins => ins.Instructions)
            .Include(ing => ing.Ingredients)
            .Include(r => r.Category)
            .SingleAsync(recipe => recipe.Id == newRecipe.Id);

            return new CreatedResult("api/Recipe/" + newRecipe.Id, new RecipeResponse(addedRecipe));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateRecipeRequest recipe)
        {
            var recipeToUpdate = await _context.Recipes.FirstOrDefaultAsync(r => r.Id == id);
            if (id != recipeToUpdate.Id)
            {
                return BadRequest("Request ID does not match any recipe.");
            }

            recipeToUpdate.Name = recipe.Name;
            recipeToUpdate.CategoryId = recipe.Category;
            recipeToUpdate.Favorite = recipe.Favorite;

            _context.Entry(recipeToUpdate).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            var recipes = await _context.Recipes
                .Include(ins => ins.Instructions)
                .Include(ing => ing.Ingredients)
                .Include(r => r.Category)
                .Where(r => r.UserEmail == recipe.UserEmail)
                .ToListAsync();

            var updatedRecipes = recipes.Select(r => new RecipeResponse(r));
            return Ok(updatedRecipes);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var recipeToDelete = await _context.Recipes
                .Include(ins => ins.Instructions)
                .Include(ing => ing.Ingredients)
                .FirstOrDefaultAsync(recipe => recipe.Id == id);

            if (recipeToDelete == null)
            {
                return NotFound();
            }

            _context.Recipes.Remove(recipeToDelete);
            await _context.SaveChangesAsync();

            var recipes = await _context.Recipes
                .Include(ins => ins.Instructions)
                .Include(ing => ing.Ingredients)
                .Include(r => r.Category)
                .Where(r => r.UserEmail == recipeToDelete.UserEmail)
                .ToListAsync();

            var recipeResponses = recipes.Select(r => new RecipeResponse(r));
            return new OkObjectResult(recipeResponses);
        }
    }
}