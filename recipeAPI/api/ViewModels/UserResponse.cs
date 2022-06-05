using System.ComponentModel.DataAnnotations;
namespace api.Models
{
    public class UserResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        public UserResponse(User userDetails)
        {
            Id = userDetails.Id;
            Name = userDetails.Name;
            Email = userDetails.Email;
        }
        public UserResponse() { }
    }

    public class UserRequest
    {
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }
    }

}
