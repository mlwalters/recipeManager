using System;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Recipe
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(150)]
        public string Description { get; set; }

        [Range(0, 100)]
        public int ServingSize { get; set; }

        [MaxLength(300)]
        public string Notes { get; set; }

        public List<Instruction> Instructions { get; set; } = new List<Instruction>();
        public Recipe(string name)
        {
            Name = name;
        }
        public Recipe(string name, string description, int servingSize, string notes)
        {
            Name = name;
            Description = description;
            ServingSize = servingSize;
            Notes = notes;
        }
    }
}