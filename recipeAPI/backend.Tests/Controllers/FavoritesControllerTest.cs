using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Controllers;
using api.Models;
using backend.Tests.Utils;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace backend.Tests.Controllers
{
    public class FavoritesControllerTest : IAsyncLifetime
    {
        private FavoritesController testObject;
        private AppDbContext db;

        public async Task InitializeAsync()
        {
            db = await TestUtils.GetTestDbContext();
            testObject = new FavoritesController(db, new Mock<ILogger<FavoritesController>>().Object);
        }

        public async Task DisposeAsync()
        {
            await db.DisposeAsync();
        }

        public class Get : FavoritesControllerTest
        {
            [Fact]
           public async void WhenFavoritesExist_ReturnsOkObjectContainingListOfFavorites_ByASpecificUser()
            {
                var email = TestData.EMAIL;
                var response = await testObject.Get(email);
                response.Should().BeOfType<OkObjectResult>();

                var favorites = (response as OkObjectResult).Value as IEnumerable<RecipeResponse>;
                var filteredFavorites = favorites.Where(r=> r.UserEmail == email).Where(r => r.Favorite == true).ToList();
                var dbFilteredfavorites = db.Recipes.Where(r=> r.UserEmail == email).Where(r => r.Favorite == true).ToList();
                filteredFavorites.Count().Should().Be(dbFilteredfavorites.Count());
            }
        }
    }
}
