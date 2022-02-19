using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.JsonPatch;

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
        // public async Task<IActionResult> Get([FromRoute] string email)
        public async Task<IActionResult> Get()
        {
            try
            {
                // var user = email
                var recipes = await _context.Recipes
                .Include(ins => ins.Instructions)
                .Include(ing => ing.Ingredients)
                .Include(c => c.Category)
                // .Where(u => u.UserEmail == email)
                .ToListAsync();
                Console.WriteLine(recipes);
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
                Step = ins.Step.ToLower().Trim() // isnullorempty
                // RecipeId = addRecipe.Id
            }).ToList();

            var ingredients = addRecipe.Ingredients.Select(ing => new Ingredient
            {
                Item = items.FirstOrDefault(i => i.ItemName.ToLower().Trim() == ing.Item.ToLower(), new Item { ItemName = ing.Item.ToLower().Trim() }),
                Amount = ing.Amount.ToLower().Trim(),
                // RecipeId = addRecipe.Id
            }).ToList();

            Recipe newRecipe = new Recipe()
            {
                Name = addRecipe.Name.Trim(),
                Description = addRecipe.Description.Trim(),
                ImageUrl = addRecipe.ImageUrl,
                ServingSize = addRecipe.ServingSize,
                Favorite = addRecipe.Favorite,
                CategoryId = addRecipe.Category,
                Notes = addRecipe.Notes.Trim(),
                Instructions = instructions,
                Ingredients = ingredients,
                // UserId= user.Id
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

            var items = await _context.Items.ToListAsync();
            var instructions = recipeToUpdate.Instructions.Select(ins => new Instruction
            {
                Step = ins.Step.ToLower().Trim() // isnullorempty
                // RecipeId = recipeToUpdate.id
            }).ToList();

            var ingredients = recipeToUpdate.Ingredients.Select(ing => new Ingredient
            {
                Item = items.FirstOrDefault(i => i.ItemName.ToLower().Trim() == ing.Item, new Item { ItemName = ing.Item.Trim() }),
                Amount = ing.Amount.ToLower().Trim(),
                // RecipeId = recipeToUpdate.Id
            }).ToList();

            recipeToUpdate.Name = recipe.Name;
            recipeToUpdate.Description = recipe.Description;
            recipeToUpdate.CategoryId = recipe.Category;
            recipeToUpdate.ServingSize = recipe.ServingSize;
            recipeToUpdate.Notes = recipe.Notes;
            recipeToUpdate.Favorite = recipe.Favorite;
            recipeToUpdate.Ingredients = recipe.Ingredients;
            recipeToUpdate.Instructions = recipe.Instructions;
            recipeToUpdate.UserEmail = recipe.UserEmail;
            _context.Entry(recipeToUpdate).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            var recipes = await _context.Recipes
                .Include(ins => ins.Instructions)
                .Include(ing => ing.Ingredients)
                .Include(r => r.Category)
                .ToListAsync();

            var updatedRecipes = recipes.Select(r => new RecipeResponse(r));
            return Ok(updatedRecipes);
            // return Ok();
            // return Ok(recipeToUpdate);
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
                .ToListAsync();

            var recipeResponses = recipes.Select(r => new RecipeResponse(r));
            return new OkObjectResult(recipeResponses);
        }
    }
}