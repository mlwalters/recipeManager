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
        public string ImageUrl { get; set; }
        [Range(0, 100)]
        public int ServingSize { get; set; }
        public bool Favorite { get; set; } = false;
        public string Category { get; set; }
        [MaxLength(300)]
        public string Notes { get; set; }
        public string UserEmail { get; set; }
        // public int UserId { get; set; }
        public virtual IEnumerable<InstructionResponse> Instructions { get; set; }
        public virtual IEnumerable<IngredientResponse> Ingredients { get; set; }
        public RecipeResponse(Recipe recipe)
        {

            Id = recipe.Id;
            Name = recipe.Name;
            Description = recipe.Description;
            ImageUrl = recipe.ImageUrl;
            ServingSize = recipe.ServingSize;
            Favorite = recipe.Favorite;
            Notes = recipe.Notes;
            Category = recipe.Category.Name;
            // UserId = recipe.UserId;
            UserEmail = recipe.UserEmail;
            Instructions = recipe.Instructions?.Select(instruction => new InstructionResponse
            {
                Id = instruction.Id,
                Step = instruction.Step,
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
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int ServingSize { get; set; }

        [Required]
        public CategoryId Category { get; set; }
        public bool Favorite { get; set; }
        public string Notes { get; set; }
        public string UserEmail { get; set; }
        // public int UserId { get; set; }

        public ICollection<InstructionResponse> Instructions { get; set; } = new List<InstructionResponse>();
        public ICollection<AddIngredient> Ingredients { get; set; } = new List<AddIngredient>();
    }
}