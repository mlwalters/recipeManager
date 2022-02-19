using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace api.Models
{
    public class UpdateRecipeRequest
    {

        // public int Id { get; set; } ???
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int ServingSize { get; set; }
        public CategoryId Category { get; set; }
        public bool Favorite { get; set; }
        public string Notes { get; set; }
        public string UserEmail { get; set; }
        // public int UserId { get; set; }

        public ICollection<InstructionResponse> Instructions { get; set; } = new List<InstructionResponse>();
        public ICollection<AddIngredient> Ingredients { get; set; } = new List<AddIngredient>();
        public UpdateRecipeRequest(string name)
        {
            Name = name;
        }
        public UpdateRecipeRequest() { }
    }
}