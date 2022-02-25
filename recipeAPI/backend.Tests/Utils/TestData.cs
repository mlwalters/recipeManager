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
        public static readonly string IMAGE_URL = "http://picture.com";
        public static readonly string RECIPE_NAME = "Filipino Chicken Adobo";
        public static readonly string DESCRIPTION = "Intense in flavour, but so fast and easy to prepare!";
        public static readonly int SERVING_SIZE = 4;
        public static readonly string CATEGORY = "Poultry";
        public static readonly int CATEGORY_ID = 3;
        public static readonly string NOTES = "One of the most amazing Asian chicken thigh recipes I have ever come across.";
        public static readonly string ITEM_NAME = "garlic";

        public static async Task SeedDBWithData(AppDbContext db)
        {
            AddItems(db);
            AddRecipes(db);

            await db.SaveChangesAsync();
        }

        private static void AddRecipes(AppDbContext db)
        {
            var recipe = new Recipe
            {
                Name = RECIPE_NAME,
                UserEmail = EMAIL,
                Description = DESCRIPTION,
                ServingSize = SERVING_SIZE,
                ImageUrl = IMAGE_URL,
                CategoryId = (CategoryId)CATEGORY_ID,
                Notes = NOTES,
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
        private static void AddIngredients(AppDbContext db)
        {
            var item1 = db.Items.First(item => item.ItemName == ITEM_NAME);
            var item2 = db.Items.First(item => item.ItemName == "ground beef");
            var recipe = db.Recipes.First(id => id.Name == RECIPE_NAME);
            var ingredient1 = new Ingredient { Amount = "3 cloves", ItemId = item1.Id, RecipeId = recipe.Id};
            var ingredient2= new Ingredient { Amount = "2 lbs", ItemId = item2.Id, RecipeId = recipe.Id};
            db.Ingredients.Add(ingredient1);
            db.Ingredients.Add(ingredient2);
        }
    }
}