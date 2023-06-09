using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Controllers;
using api.Models;
using tests.Utils;
// using api.ViewModels;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace tests.Controllers
{
    public class CategoryControllerTest : IAsyncLifetime
    {
        private CategoryController testObject;
        private AppDbContext db;

        public async Task InitializeAsync()
        {
            db = await TestUtils.GetTestDbContext();
            testObject = new CategoryController(db, new Mock<ILogger<CategoryController>>().Object);
        }

        public async Task DisposeAsync()
        {
            await db.DisposeAsync();
        }

        public class Get : CategoryControllerTest
        {
            [Fact]
            public async void ReturnsOkObjectContainingListOfCategories()
            {
                
                var response = await testObject.Get();
                response.Should().BeOfType<OkObjectResult>();

                var categories = (response as OkObjectResult).Value as IEnumerable<CategoryResponse>;
                categories.Count().Should().Be(13);
                var poultry = categories.First(c => c.Name == TestData.CATEGORY);
                poultry.Id.Should().Be((CategoryId)TestData.CATEGORY_ID);
            }
        }
    }
}
