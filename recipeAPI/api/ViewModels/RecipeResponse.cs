using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace api.Models
{
    public class RecipeResponse
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(150)]
        public string Description { get; set; }

        [Range(0, 100)]
        public int ServingSize { get; set; }
        public virtual Category RecipeType { get; set; }

        [MaxLength(300)]
        public string Notes { get; set; }

        public virtual IEnumerable<InstructionResponse> Instructions { get; set; } //= new List<Instruction>();
        public virtual IEnumerable<IngredientResponse> Ingredients { get; set; } //= new List<Instruction>();
        public RecipeResponse(string name)
        {
            Name = name;
        }
        public RecipeResponse(string name, string description, int servingSize, string notes)
        {
            Name = name;
            Description = description;
            ServingSize = servingSize;
            Notes = notes;
        }
        public RecipeResponse() { }

        // public int? CategoryId { get; set; }

        // public virtual Category Category { get; set; }

        // [NotMapped]
        // public CategoryId? RecipeType { get { return (CategoryId?)CategoryId; } }
    }
    public class IngredientResponse
    {
        public int Id { get; set; }
        public string Amount { get; set; }
        public string Name { get; set; }
    }
    public class InstructionResponse
    {
        public int Id { get; set; }
        public string Step { get; set; }
        public int StepNumber { get; set; }
    }
    // public class ItemResponse
    // {

    // }
}