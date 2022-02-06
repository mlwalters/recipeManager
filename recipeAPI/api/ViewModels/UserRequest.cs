using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Models
{
    public class UserRequest
    {
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }
    }
}