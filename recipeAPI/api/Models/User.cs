using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [JsonIgnore]
        public virtual ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();
        // [JsonIgnore]
        // public virtual ICollection<Recipe> Favorites{ get; set; } = new List<Recipe>();

        public User(User userDetails)
        {
            Name = userDetails.Name;
            Email = userDetails.Email;
        }
        public User() { }
    }
}
