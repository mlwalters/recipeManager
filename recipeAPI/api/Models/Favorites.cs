using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Models
{
    public class Favorite
    {
        public int Id { get; set; }

        [JsonIgnore]
        public virtual ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();

        public Favorite(Recipe recipe)
        {
        }
         public Favorite()
        {
        }
    }
}