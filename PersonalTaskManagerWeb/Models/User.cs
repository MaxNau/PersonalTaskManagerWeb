using System.ComponentModel.DataAnnotations;

namespace PersonalTaskManagerWeb.Models
{
    public class User
    {
        [Required]
        [StringLength(50)]
        [Display(Name = "User name")]
        public string Name { get; set; }

        [Required]
        [StringLength(128, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 5)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}