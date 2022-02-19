using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace api.Models
{
    public class UpdateRecipeRequest
    {
        public string Name { get; set; }
        public CategoryId Category { get; set; }
        public bool Favorite { get; set; } = false;
        public string UserEmail { get; set; }

    }
}