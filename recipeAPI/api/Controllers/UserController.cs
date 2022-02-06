
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<UserController> _logger;

        public UserController(AppDbContext context, ILogger<UserController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int userId)
        {
            try
            {
                var user = await _context.Users.Include(r => r.Recipes).FirstOrDefaultAsync(u => u.Id == userId);

                return user is not null ? Ok(new User(user)) : new NotFoundResult();
            }

            catch (Exception e)
            {
                _logger.LogCritical($"SQL Read error. It is likely that there is no database connection established. ${e.Message}");
                throw;
            }
        }


   [HttpPost]
        public async Task<IActionResult> Post([FromBody] User userDetails)
        {
            User newUser = new User()
            {
                Name = userDetails.Name,
                Email= userDetails.Email             
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            var addedUser = await _context.Users.Include(r =>r.Recipes).SingleAsync(u => u.Id == newUser.Id);

            return new CreatedResult("api/User/" + newUser.Id, new User(addedUser));
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> Delete(int userId)
        {

            var user = await _context.Users.FirstAsync(u => u.Id == userId);

            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}