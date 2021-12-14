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
        public void WhenRecipeIsConstructedWithName_ThenNameIsSetCorrectly()
        {
            var expectedName = "Creamy Cinnamon Pudding";

            var result = new Recipe(expectedName);

            result.Name.Should().Be(expectedName);
        }
    }
}
