using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using kmserver.Models;
using Microsoft.AspNetCore.Authorization;

namespace kmserver.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;
        private SignInManager<ApplicationUser> signInManager;

        public AuthController(UserManager<ApplicationUser> _userManager, SignInManager<ApplicationUser> _signInManager)
        {
            userManager = _userManager;
            signInManager = _signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UserRegisterModel userRegister)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser appUser = new ApplicationUser
                {
                    UserName = userRegister.Username,
                };

                IdentityResult result = await userManager.CreateAsync(appUser, userRegister.Password);
                if (result.Succeeded)
                {

                    return Ok(result);
                }
                else
                {
                    return StatusCode(510, result);
                }
            }
            return StatusCode(520);
        }

        [HttpPut]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] UserLoginModel userLogin)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser appUser = await userManager.FindByNameAsync(userLogin.Username);
                if (appUser != null)
                {
                    Microsoft.AspNetCore.Identity.SignInResult result = await signInManager.PasswordSignInAsync(appUser, userLogin.Password, false, false);
                    if (result.Succeeded)
                    {
                        return Ok(appUser);
                    }
                }
                ModelState.AddModelError(nameof(userLogin.Username), "Login Failed: Invalid Username or Password");
            }

            return StatusCode(530);
        }

        [HttpDelete]
        [Authorize]
        public async void Logout()
        {
            await signInManager.SignOutAsync();
        }
    }
}
