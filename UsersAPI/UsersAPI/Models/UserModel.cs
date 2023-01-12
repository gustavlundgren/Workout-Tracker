using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UsersAPI.Models
{
    public class UserModel
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName ="nvarchar(50)")]
        public string Username { get; set; }

        [Column(TypeName ="nvarchar(250)")]    
        public string Email { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string Password { get; set; }
    }
}
