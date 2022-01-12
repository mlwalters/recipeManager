using System;
using System.Text.Json.Serialization;

namespace api.Models
{
    public class Recipe
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int ServingSize { get; set; }

        // public int? CategoryId { get; set; }

        // public virtual Category Category { get; set; }
        public virtual Category RecipeType { get; set; }

        // [NotMapped]
        // public CategoryId? RecipeType { get { return (CategoryId?)CategoryId; } }
        public string Notes { get; set; }

        [JsonIgnore]
        public virtual ICollection<Instruction> Instructions { get; set; } //= new List<Instruction>();
        public Recipe(string name)
        {
            Name = name;
        }
        public Recipe(string name, string description, int servingSize, string notes)
        {
            Name = name;
            Description = description;
            ServingSize = servingSize;
            Notes = notes;
        }
    }
}