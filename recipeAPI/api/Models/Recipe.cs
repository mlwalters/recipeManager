using System;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Recipe
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(100)]
        public string Name{ get; set; }
        public Recipe (string name)
        {
            Name = name;
        }
    }
}