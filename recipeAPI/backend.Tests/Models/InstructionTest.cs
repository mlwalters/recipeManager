using System.Threading.Tasks;
using api.Models;
using backend.Tests.Utils;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace backend.Tests.Models
{
    public class InstructionTest
    {
        [Fact]
        public void WhenInstructionIsConstructed_ThenStepAndStepNumberAreSetCorrectly()
        {
            var expectedStepNumber = 1;
            var expectedStep = "Combine Chicken and marinade ingredients in a bowl.";

            var result = new Instruction(expectedStep, expectedStepNumber);

            result.Step.Should().Be(expectedStep);
            result.StepNumber.Should().Be(expectedStepNumber);
        }
    }
}
