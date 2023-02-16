using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroceryItemsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<GroceryItemsController> _logger;
        public GroceryItemsController(AppDbContext context, ILogger<GroceryItemsController> logger)
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
                var groceryList = await _context.GroceryItems.Where(g => g.UserEmail == email).ToListAsync();
                var groceryListResponse = groceryList.Select(gi => new GroceryItemResponse(gi));
                return Ok(groceryListResponse);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"SQL Read error. It is likely that there is no database connection established. ${e.Message}");
                throw;
            }
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Post(AddGroceryRequest addrequest)
        {
            try
            {
                var items = await _context.Items.ToListAsync();
                Item newItem = items.FirstOrDefault(i => i.ItemName.Trim().ToLower() == addrequest.ItemName.Trim().ToLower(), new Item { ItemName = addrequest.ItemName.Trim().ToLower() });
                _context.Items.Add(newItem);
                await _context.SaveChangesAsync();

                GroceryItem itemToAdd = new GroceryItem
                {
                    UserEmail = addrequest.UserEmail,
                    ItemId = newItem.Id,
                    Checked = false,
                };

                _context.GroceryItems.Add(itemToAdd);
                await _context.SaveChangesAsync();

                var addedItem = await _context.GroceryItems.SingleAsync(item => item.Id == itemToAdd.Id);
                var groceryItemResponse = new GroceryItemResponse(addedItem);
                return new CreatedResult("api/GroceryItems/Add/" + addedItem.Id, new GroceryItemResponse(addedItem));
            }
            catch (Exception e)
            {
                _logger.LogCritical($"SQL Read error. It is likely that there is no database connection established. ${e.Message}");
                throw;
            }
        }

        [HttpPost("Add/{recipeId}")]
        public async Task<IActionResult> Post(int recipeId)
        {
            try
            {
                var recipe = await _context.Recipes.FirstAsync(r => r.Id == recipeId);
                var ingredients = await _context.Ingredients.Where(ing => ing.RecipeId == recipeId).ToListAsync();
                var items = ingredients.Select(ing => ing.ItemId).Distinct().ToList();
                var itemsToAdd = await _context.Items.Where(i => items.Contains(i.Id)).ToListAsync();
                var currentGroceryList = await _context.GroceryItems.Where(gi => gi.UserEmail == recipe.UserEmail).ToListAsync();
                var noDuplicates = itemsToAdd.Where(i => !currentGroceryList.Any(gl => gl.ItemId == i.Id));

                var listOfGroceryItems = noDuplicates?.Select(i => new GroceryItem
                {
                    UserEmail = recipe.UserEmail,
                    ItemId = i.Id,
                })
                .ToList();

                _context.GroceryItems.AddRange(listOfGroceryItems);
                await _context.SaveChangesAsync();

                var groceries = await _context.GroceryItems
                .Where(g => g.UserEmail == recipe.UserEmail)
                .ToListAsync();

                var updatedGroceryItems = groceries.Select(g => new GroceryItemResponse(g));
                return Ok(updatedGroceryItems);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"SQL Read error. It is likely that there is no database connection established. ${e.Message}");
                throw;
            }
        }
    }
}