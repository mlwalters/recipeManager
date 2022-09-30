using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroceryListController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<GroceryListController> _logger;

        public GroceryListController(AppDbContext context, ILogger<GroceryListController> logger)
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
                var groceryList = await _context.GroceryList.Where(g => g.UserEmail == email).ToListAsync();

                var groceryListResponse = groceryList.Select(gl => new GroceryItemResponse(gl));
                return Ok(groceryListResponse);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"SQL Read error. It is likely that there is no database connection established. ${e.Message}");
                throw;
            }
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> Post(int id)
        {
            try
            {
                // Get ingredients related to the recipe id, then from ing get itemids
                var recipe = await _context.Recipes.FirstAsync(r => r.Id == id);
                var ingredients = await _context.Ingredients.Where(ing => ing.RecipeId == id).ToListAsync();
                var items = ingredients.Select(ing => ing.ItemId).Distinct().ToList(); // list of unique items ids in ingredients
                var itemsToAdd = await _context.Items.Where(i => items.Contains(i.Id)).ToListAsync(); // list of Item objects unique from the ingredients and db

                var listOfGroceryItems = itemsToAdd.Select(i => new GroceryItem
                {
                    UserEmail = recipe.UserEmail,
                    ItemId = i.Id,
                }).ToList();

                _context.GroceryList.AddRange(listOfGroceryItems);
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogCritical($"SQL Read error. It is likely that there is no database connection established. ${e.Message}");
                throw;
            }
        }
    }
}