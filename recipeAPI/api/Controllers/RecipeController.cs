using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using Microsoft.Extensions.Logging;

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
        public async Task<IActionResult> Get()
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync();
                var recipes = await _context.Recipes
                .Include(ins => ins.Instructions)
                .Include(ing => ing.Ingredients)
                .Include(r => r.Category)
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
                Id = ins.Id,
                Step = ins.Step,
                StepNumber = ins.StepNumber,
                RecipeId = addRecipe.Id
            }).ToList();

            var ingredients = addRecipe.Ingredients.Select(ing => new Ingredient
            {
                Id = ing.Id,
                //Item = items.First(i => i.ItemId == ing.ItemId, new Item { ItemName = ing.Item}), // OTHER OPTION IS TERNARY --> ? items.First(i => i.ItemName.ToLower() == ing.Item.ToLower()) : new Item { ItemName = ing.Item}, //save as a function
                Item = items.FirstOrDefault(i => i.ItemName.ToLower().Trim() == ing.Item.ToLower().Trim(), new Item { ItemName = ing.Item.ToLower().Trim() }), //? items.First(i => i.ItemName.ToLower() == ing.Item.ToLower()) : new Item { ItemName = ing.Item}, //save as a function
                Amount = ing.Amount,
                RecipeId = addRecipe.Id
            }).ToList();

            Recipe newRecipe = new Recipe()
            {
                Name = addRecipe.Name,
                Description = addRecipe.Description,
                ServingSize = addRecipe.ServingSize,
                CategoryId = addRecipe.Category,
                Notes = addRecipe.Notes,
                Instructions = instructions,
                Ingredients = ingredients
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
    }
}