using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace backend.Tests.Utils
{
    public static class TestUtils
    {
        public static readonly string RECIPE_NAME = "Filipino Chicken Adobo";
        public static readonly string RECIPE_DESCRIPTION = "Intense in flavour, but so fast and easy to prepare!";
        public static readonly int RECIPE_SERVING_SIZE = 4;
        public static readonly Category RECIPE_CATEGORY = Category.Poultry;
        public static readonly string RECIPE_NOTES = "One of the most amazing Asian chicken thigh recipes I have ever come across.";
        public static readonly Dictionary<int, string> INSTRUCTIONS_STEP = new Dictionary<int, string>
        {
            {1, "Combine Chicken and marinade ingredients in a bowl."},
            {2, "Marinate for at least 20 minutes, or up to overnight."}
        };

        public static async Task<AppDbContext> GetTestDbContext()
        {
            var db = new AppDbContext(CreateOptions());
            await db.Database.EnsureDeletedAsync();
            await db.Database.EnsureCreatedAsync();

            // var instruction = new Instruction(INSTRUCTIONS_STEP.Key, INSTRUCTIONS_STEP.Value);
            var instructions = INSTRUCTIONS_STEP.Select(ps => new Instruction(ps.Value, ps.Key)).ToList();

            var recipe = new Recipe(RECIPE_NAME, RECIPE_DESCRIPTION, RECIPE_SERVING_SIZE, RECIPE_NOTES);
            
            recipe.Instructions = instructions;
            db.Recipes.Add(recipe);
            await db.SaveChangesAsync();

            return db;
        }

        private static DbContextOptions<AppDbContext> CreateOptions()
        {
            var connection = new SqliteConnection("Filename=:memory:");
            connection.Open();

            var builder = new DbContextOptionsBuilder<AppDbContext>();
            builder.UseSqlite(connection);

            builder.ConfigureWarnings(x => x.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.AmbientTransactionWarning));

            return builder.Options;
        }
    }
}