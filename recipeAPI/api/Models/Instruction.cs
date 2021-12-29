using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class Instruction
    {
        public int Id { get; set; }

        [MaxLength(300)]
        public string Step { get; set; }

        [MaxLength(30)]
        public int StepNumber { get; set; }
             
        [ForeignKey("RecipeId")]
        public int RecipeId { get; set; }
        public Instruction (string step, int stepNumber)
        {
            Step = step;
            StepNumber = stepNumber;
        }
    }
}