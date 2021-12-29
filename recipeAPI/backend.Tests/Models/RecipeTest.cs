using System.Threading.Tasks;
using api.Models;
using backend.Tests.Utils;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace backend.Tests.Models
{
    public class RecipeTest
    {
        [Fact]
        public void WhenRecipeIsConstructed_ThenRecipeNameIsSetCorrectly()
        {
            var expectedName = "Filipino Chicken Adobo";

            var result = new Recipe(expectedName);

            result.Name.Should().Be(expectedName);
        }
    }
}
