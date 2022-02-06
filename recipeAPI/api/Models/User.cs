using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        public virtual ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();

        public User(User userDetails)
        {
            Name = userDetails.Name;
            Email = userDetails.Email;
        }

        public User() { }
    }
}