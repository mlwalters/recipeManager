
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
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

                return user is not null ? Ok(new UserResponse(user)) : new NotFoundResult();
            }

            catch (Exception e)
            {
                _logger.LogCritical($"SQL Read error. It is likely that there is no database connection established. ${e.Message}");
                throw;
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserRequest userDetails)
        {
            User newUser = new User()
            {
                Name = userDetails.Name,
                Email= userDetails.Email             
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            var addedUser = await _context.Users.Include(r =>r.Recipes).SingleAsync(u => u.Id == newUser.Id);

            return new CreatedResult("api/User/" + newUser.Id, new UserResponse(addedUser));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {

            var user = await _context.Users.Include(r => r.Recipes).FirstAsync(u => u.Id == id);

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