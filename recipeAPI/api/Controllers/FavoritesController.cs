using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;


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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var favorite = await _context.Favorites.FirstOrDefaultAsync(f => f.Id == id);

                return Ok(favorite); //is not null ? Ok(new Favorite(favorite)) : new NotFoundResult();
            }

            catch (Exception e)
            {
                _logger.LogCritical($"SQL Read error. It is likely that there is no database connection established. ${e.Message}");
                throw;
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] int recipeId)
        {
            Favorite newFavorite = new Favorite()
            {
                          
            };

            _context.Favorites.Add(newFavorite);
            await _context.SaveChangesAsync();

            // var addedFavorite = await _context.Favorites.Include(r =>r.Recipes).SingleAsync(f => f.Id == newFavorite.Id);

            // return new CreatedResult("api/Favorite/" + newFavorite.Id, new Favorite(addedFavorite));
            return Ok(newFavorite);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {

            var favorite = await _context.Favorites.Include(r => r.Recipes).FirstAsync(f => f.Id == id);

            if (favorite == null)
            {
                return NotFound();
            }

            _context.Favorites.Remove(favorite);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}