using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingListController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ShoppingListController> _logger;

        public ShoppingListController(AppDbContext context, ILogger<ShoppingListController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var shoppingList = await _context.ShoppingList.ToListAsync();

                var shoppingListResponse = shoppingList.Select(sl =>
                    new ShoppingResponse
                    {
                        ListItem = sl.Item.ItemName,
                        Checked = sl.Checked
                    }
                );

                return Ok(shoppingListResponse);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"SQL Read error. It is likely that there is no database connection established. ${e.Message}");
                throw;
            }
        }
    }
}