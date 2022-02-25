using System;
using System.Text.Json.Serialization;

namespace api.Models
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string Amount { get; set; }
        public int ItemId { get; set; }
        public int RecipeId { get; set; }
        public virtual Recipe Recipe { get; set; }
        public virtual Item Item { get; set; }
    }
}