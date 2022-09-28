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

        [HttpPost("{email}")]
        public async Task<IActionResult> Post(string email, [FromBody] IEnumerable<Ingredient> ingredients)
        {
            var items = await _context.Ingredients
                .Select(ing => new GroceryItem
                {
                    ItemId = ing.ItemId,
                    UserEmail = email
                })
                .DistinctBy(i => i.ItemId)
                .ToListAsync();
            // GroceryItem newGroceryItem = new GroceryItem()
            // {
            //     ItemId = addGroceryItem.ItemId,
            //     Checked = addGroceryItem.Checked,
            //     UserEmail = email
            // };

            // _context.GroceryList.Add(newGroceryItem);
            // await _context.SaveChangesAsync();

            // var addedGroceryItem = await _context.GroceryList

            // .ToListAsync(recipe => recipe.Id == newRecipe.Id);

            // return new CreatedResult("api/GroceryList/" + newRecipe.Id, new RecipeResponse(addedRecipe));
            return items;
        }
    }
}