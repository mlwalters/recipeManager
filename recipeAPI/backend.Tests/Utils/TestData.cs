using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace backend.Tests.Utils
{
    public static class TestData
    {
        public static readonly string EMAIL = "google@yahoo.com";
        public static readonly string RECIPE_NAME = "Filipino Chicken Adobo";
        public static readonly string DESCRIPTION = "Intense in flavour, but so fast and easy to prepare!";
        public static readonly int SERVING_SIZE = 4;
        public static readonly string CATEGORY = "Poultry";
        public static readonly int CATEGORY_ID = 4;
        public static readonly string NOTES = "One of the most amazing Asian chicken thigh recipes I have ever come across.";
        public static readonly Dictionary<int, string> INSTRUCTIONS = new Dictionary<int, string>
        {
            {11, "Combine Chicken and marinade ingredients in a bowl."},
            {12, "Marinate for at least 20 minutes, or up to overnight."}
        };

        public static readonly Dictionary<int, string> INGREDIENTS = new Dictionary<int, string>
        {
            {11, ""},
            {12, ""}
        };

        private static readonly Dictionary<int, string> ITEMS = new Dictionary<int, string>
        {
            {25, "soy sauce"},
            {26, "garlic"},
        };

        public static async Task SeedDBWithData(AppDbContext db)
        {
            AddItems(db);
            // AddIngredients(db);
            AddInstructions(db);
            AddRecipes(db);

            await db.SaveChangesAsync();
        }

        private static void AddRecipes(AppDbContext db)
        {
            var recipe = new Recipe
            {
                Name = RECIPE_NAME,
                Description = DESCRIPTION,
                ServingSize = SERVING_SIZE,
                // Category = CATEGORY_ID,
                Notes = NOTES,
                Ingredients = new List<Ingredient>(), // {}
                Instructions = new List<Instruction>(), // {}
            };
            db.Recipes.Add(recipe);
        }
        private static void AddItems(AppDbContext db)
        {
            db.Items.Add(new Item { ItemName = "ground beef" });
            db.Items.Add(new Item { ItemName = "chicken broth" });
            db.Items.Add(new Item { ItemName = "onion" });
            db.Items.Add(new Item { ItemName = "garlic" });
        }
        // private static void AddIngredients(AppDbContext db)
        // {
        //     var ingredients = INGREDIENTS
        //         .Select(ing => new Ingredient { ItemId = ITEMS.First(i => i.ItemId == ing.Item.Id })
        //         .ToList();
        //     db.Ingredients.AddRange(ingredients);
        //     // items.FirstOrDefault(i => i.ItemName.ToLower().Trim() == ing.Item.ToLower().Trim()
        // }
        private static void AddInstructions(AppDbContext db)
        {
            // var instruction = new Instruction(INSTRUCTIONS.Key, INSTRUCTIONS.Value);
            // var instructions = INSTRUCTIONS
            //     .Select(ins => new Instruction(ins.Value, ins.Key))
            //     .ToList();
            // db.Instructions.AddRange(instructions);


            // var instruction = new Instruction(INSTRUCTIONS_STEP.Key, INSTRUCTIONS_STEP.Value);
            // var instructions = INSTRUCTIONS_STEP.Select(ps => new Instruction(ps.Value, ps.Key)).ToList();
        }
    }
}