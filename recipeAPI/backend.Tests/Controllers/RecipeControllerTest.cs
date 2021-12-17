using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Controllers;
using api.Models;
using backend.Tests.Utils;
// using api.ViewModels;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace backend.Tests.Controllers
{
    public class RecipeControllerTest : IAsyncLifetime
    {
        private RecipeController testObject;
        private AppDbContext db;

        public async Task InitializeAsync()
        {
            db = await TestUtils.GetTestDbContext();
            testObject = new RecipeController(db, new Mock<ILogger<RecipeController>>().Object);
        }

        public async Task DisposeAsync()
        {
            await db.DisposeAsync();
        }

        public class GetAllRecipe : RecipeControllerTest
        {
            [Fact]
            public async void WhenRecipesExist_ReturnsOkObjectContainingRecipe()
            {
                var response = await testObject.Get();

                response.Should().BeOfType<OkObjectResult>();
                var result = (response as OkObjectResult).Value as IEnumerable<Recipe>;
                result.Count().Should().Be(db.Recipes.Count());
                result.Count(recipe => recipe.Name == TestUtils.RECIPE_NAME).Should().Be(1);
            }

            // [Fact]
            // public async void WhenNoRecipe_ReturnsNotFound()
            // {
            //     db.Recipes.Remove(db.Recipes.First());
            //     await db.SaveChangesAsync();

            //     var response = await testObject.Get();

            //     response.Should().BeOfType<NotFoundResult>();
            // }

            [Fact]
            public async void WhenAnErrorOccursUsingDataBase_ThrowsError()
            {
                var mockDb = new Mock<AppDbContext>();
                mockDb.Setup(x => x.Recipes).Throws(new Exception("Something Broke"));
                var testObject = new RecipeController(mockDb.Object, new Mock<ILogger<RecipeController>>().Object);

                var exception = await Assert.ThrowsAsync<Exception>(() => testObject.Get());

                exception.Message.Should().Be("Something Broke");
            }
        }
        public class GetById : RecipeControllerTest
        {
            [Fact]
            public async void WhenRecipeExists_ReturnsOkObjectContainingRecipe()
            {
                var testId = db.Recipes.First(r => r.Name == TestUtils.RECIPE_NAME).Id;
                var response = await testObject.GetById(testId);

                response.Should().BeOfType<OkObjectResult>();
                var recipeResult = (response as OkObjectResult).Value as Recipe;
                recipeResult.Name.Should().Be(TestUtils.RECIPE_NAME);
                recipeResult.ServingSize.Should().Be(TestUtils.RECIPE_SERVING_SIZE);
            }
        }
    }
}
