using System.ComponentModel.DataAnnotations;

namespace WorkoutTrackerAPI.Models
{
    public class UserDto
    {
        [Key]
        public string Username { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;
    }
}
