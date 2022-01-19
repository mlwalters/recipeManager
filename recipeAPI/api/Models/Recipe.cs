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
        public Recipe() { }
    }
}