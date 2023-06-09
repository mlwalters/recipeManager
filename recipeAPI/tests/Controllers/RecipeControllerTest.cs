using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Controllers;
using api.Models;
using tests.Utils;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace tests.Controllers
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
                
                response.Should().BeOfType<OkObjectResult>();

                var recipeList = (response as OkObjectResult).Value as IEnumerable<RecipeResponse>;
                var filteredList = recipeList.Where(r=> r.UserEmail == email).ToList();
                var dbFilteredList = db.Recipes.Where(r=> r.UserEmail == email).ToList();
                filteredList.Count().Should().Be(dbFilteredList.Count());
                filteredList.Count(recipe => recipe.UserEmail == TestData.EMAIL).Should().Be(1);
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
                result.Name.Should().Be(TestData.RECIPE_NAME);
                result.ServingSize.Should().Be(TestData.SERVING_SIZE);
                result.Category.Should().Be(TestData.CATEGORY);
                result.Notes.Should().Be(TestData.NOTES);
            }

            [Fact]
            public async void WhenNoRecipe_ReturnsNotFound()
            {
                var testId = 10000000;
                var response = await testObject.GetById(testId);
                response.Should().BeOfType<NotFoundResult>();
            }

            [Fact]
            public async void WhenAnErrorOccursGettingARecipeUsingDataBase_ThrowsError()
            {
                var testId = 3000000;
                var mockDb = new Mock<AppDbContext>();
                mockDb.Setup(x => x.Recipes).Throws(new Exception("Something Broke"));
                var testObject = new RecipeController(mockDb.Object, new Mock<ILogger<RecipeController>>().Object);

                var exception = await Assert.ThrowsAsync<Exception>(() => testObject.GetById(testId));

                exception.Message.Should().Be("Something Broke");
            }
        }
    }
}
