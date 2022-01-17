using System;
using System.Text.Json.Serialization;

namespace api.Models
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string Amount { get; set; }
        public string Name { get; set; }
        public int ItemId { get; set; }
        public int RecipeId { get; set; }
        public virtual Recipe Recipe { get; set; }
        public virtual Item Item { get; set; }

        public Ingredient(int id, string amount, Item item)
        {
            Id = id;
            Amount = amount;
            Name = Item.ItemName;
        }
        public Ingredient(){}
    }
}