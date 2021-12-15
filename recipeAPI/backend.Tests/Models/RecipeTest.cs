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

        // [Fact]
        // public void WhenRecipeIsConstructed_ThenNameDescServingSizeNotesAreSetCorrectly()
        // {
        //     var expectedName = "Filipino Chicken Adobo";
        //     var expectedDescription = "Intense in flavour, but so fast and easy to prepare!";
        //     var expectedServingSize = 4;
        //     var expectedNotes = "One of the most amazing Asian chicken thigh recipes I have ever come across.";
    
        //     var result = new Recipe(expectedName, expectedDescription, expectedServingSize, expectedNotes);

        //     result.Name.Should().Be(expectedName);
        //     result.Description.Should().Be(expectedDescription);
        //     result.ServingSize.Should().Be(expectedServingSize);
        //     result.Notes.Should().Be(expectedNotes);
        // }
    }
}
