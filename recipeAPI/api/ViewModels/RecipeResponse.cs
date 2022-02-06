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

        public string Category { get; set; }

        [MaxLength(300)]
        public string Notes { get; set; }

        public int UserId { get; set; }

        public virtual IEnumerable<InstructionResponse> Instructions { get; set; } //= new List<Instruction>();
        public virtual IEnumerable<IngredientResponse> Ingredients { get; set; } //= new List<Instruction>();

        public RecipeResponse(string name)
        {
            Name = name;
        }
        public RecipeResponse(Recipe recipe)
        {

            Id = recipe.Id;
            Name = recipe.Name;
            Description = recipe.Description;
            ServingSize = recipe.ServingSize;
            Notes = recipe.Notes;
            Category = recipe.Category.Name;
            UserId = recipe.UserId;
            Instructions = recipe.Instructions?.Select(instruction => new InstructionResponse
            {
                Id = instruction.Id,
                Step = instruction.Step,
                StepNumber = instruction.StepNumber
            });
            Ingredients = recipe.Ingredients?.Select(ingredient => new IngredientResponse
            {
                Id = ingredient.Id,
                Name = ingredient.Item.ItemName,
                Amount = ingredient.Amount
            });
        }
    }

    public class AddRecipe
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int ServingSize { get; set; }

        public CategoryId Category { get; set; } // Change to int?

        public string Notes { get; set; }

        public ICollection<AddInstruction> Instructions { get; set; } = new List<AddInstruction>();
        public ICollection<AddIngredient> Ingredients { get; set; } = new List<AddIngredient>();
        public AddRecipe(string name)
        {
            Name = name;
        }
        public AddRecipe() { }
    }
}