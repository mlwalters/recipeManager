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
        public virtual Category Category { get; set; }
        public CategoryId CategoryId { get; set; }
        public string Notes { get; set; }

        [JsonIgnore]
        public virtual ICollection<Instruction> Instructions { get; set; } //= new List<Instruction>();

        [JsonIgnore]
        public virtual ICollection<Ingredient> Ingredients { get; set; } //= new List<Instruction>();
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
        public Recipe() { }
        // public int? CategoryId { get; set; }
        // public virtual Category Category { get; set; }
        // [NotMapped]
        // public CategoryId? RecipeType { get { return (CategoryId?)CategoryId; } }
    }
}