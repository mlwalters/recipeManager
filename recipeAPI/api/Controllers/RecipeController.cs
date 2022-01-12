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
        public async Task<IActionResult> GetRecipes()
        {
            try
            {
                var recipes = await _context.Recipes.Include(ins => ins.Instructions).ToListAsync();

                return Ok(recipes);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"SQL Read error. It is likely that there is no database connection established. ${e.Message}");
                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecipe(int id)
        {
            try
            {
                var recipe = await _context.Recipes.Include(ins => ins.Instructions).FirstOrDefaultAsync(recipe => recipe.Id == id);

                if (recipe == null)
                {
                    return NotFound();
                }

                var recipeResponse = new RecipeResponse
                {
                    Id = recipe.Id,
                    Name = recipe.Name,
                    Description = recipe.Description,
                    ServingSize = recipe.ServingSize,
                    Notes = recipe.Notes,
                    RecipeType = recipe.RecipeType,
                };
                return Ok(recipeResponse);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"SQL Read error. It is likely that there is no database connection established. ${e.Message}");
                throw;
            }
        }
    }
}