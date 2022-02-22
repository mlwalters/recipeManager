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
    public class FavoritesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<FavoritesController> _logger;

        public FavoritesController(AppDbContext context, ILogger<FavoritesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        [Route("{email}")]
        public async Task<IActionResult> Get(string email)
        {
       try
            {
                var recipes = await _context.Recipes
                .Include(r => r.Category)
                .Where(r => r.Favorite == true)
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
    }
}