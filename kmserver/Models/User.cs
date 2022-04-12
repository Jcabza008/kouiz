using System.ComponentModel.DataAnnotations;

namespace kmserver.Models
{
    public class User
    {
        [Required]
        public string Username { get; set; }

    }
}
