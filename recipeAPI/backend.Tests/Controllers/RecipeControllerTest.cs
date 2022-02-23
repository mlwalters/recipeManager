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

        public class Get : RecipeControllerTest
        {
            [Fact]
            public async void WhenRecipesExist_ReturnsOkObjectContainingListOfRecipes()
            {
                var email = TestData.EMAIL;
                var response = await testObject.Get(email);
                Console.WriteLine(response);
                response.Should().BeOfType<OkObjectResult>();

                var recipeList = (response as OkObjectResult).Value as IEnumerable<RecipeResponse>;
                recipeList.Count().Should().Be(db.Recipes.Count());
                recipeList.Count(recipe => recipe.Name == TestData.RECIPE_NAME).Should().Be(1);
                // var recipe = recipeList.First(p => p.Name == TestData.RECIPE_NAME);

                // recipe.Name.Should().Be(TestData.RECIPE_NAME);

            }

            [Fact]
            public async void WhenNoRecipes_ReturnsEmptyList()
            {
                db.Recipes.RemoveRange(db.Recipes);
                await db.SaveChangesAsync();

                var email = TestData.EMAIL;
                var response = await testObject.Get(email);
                response.Should().BeOfType<OkObjectResult>();
                var result = (response as OkObjectResult).Value as IEnumerable<RecipeResponse>;
                result.Any().Should().BeFalse();
            }

            [Fact]
            public async void WhenAnErrorOccursGettingRecipesUsingDataBase_ThrowsError()
            {
                var mockDb = new Mock<AppDbContext>();
                mockDb.Setup(x => x.Recipes).Throws(new Exception("Something Broke"));
                var testObject = new RecipeController(mockDb.Object, new Mock<ILogger<RecipeController>>().Object);

                var email = TestData.EMAIL;
                var exception = await Assert.ThrowsAsync<Exception>(() => testObject.Get(email));

                exception.Message.Should().Be("Something Broke");
            }
        }
        public class GetById : RecipeControllerTest
        {
            [Fact]
            public async void WhenRecipeExists_ReturnsOkObjectContainingRecipe()
            {
                var testId = db.Recipes.First(r => r.Name == TestData.RECIPE_NAME).Id;
                var response = await testObject.GetById(testId);
                response.Should().BeOfType<OkObjectResult>();

                var result = (response as OkObjectResult).Value as RecipeResponse;
                Console.WriteLine(result);
                result.Name.Should().Be(TestData.RECIPE_NAME);
                result.ServingSize.Should().Be(TestData.SERVING_SIZE);
                // result.Category.Should().Be(TestData.RECIPE_CATEGORY);
                result.Instructions.Count().Should().Be(TestData.INSTRUCTIONS.Count());
            }

            [Fact]
            public async void WhenNoRecipe_ReturnsNotFound()
            {
                var testId = 888999;
                var response = await testObject.GetById(testId);
                response.Should().BeOfType<NotFoundResult>();
            }

            [Fact]
            public async void WhenAnErrorOccursGettingARecipeUsingDataBase_ThrowsError()
            {
                var testId = 888999;
                var mockDb = new Mock<AppDbContext>();
                mockDb.Setup(x => x.Recipes).Throws(new Exception("Something Broke"));
                var testObject = new RecipeController(mockDb.Object, new Mock<ILogger<RecipeController>>().Object);

                var exception = await Assert.ThrowsAsync<Exception>(() => testObject.GetById(testId));

                exception.Message.Should().Be("Something Broke");
            }
        }
    }
}
