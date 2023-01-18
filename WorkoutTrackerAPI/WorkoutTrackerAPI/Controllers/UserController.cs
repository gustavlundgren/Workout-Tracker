using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkoutTrackerAPI.Models;

namespace WorkoutTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly WorkoutTrackerDbContext _context;
        private readonly IConfiguration _configuration;

        public UserController(WorkoutTrackerDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet("Public")]
        public async Task<IActionResult> Public()
        {
            return Ok("This is public!");
        }

        [HttpGet("Admins")]
        [Authorize]
        public async Task<IActionResult> AdminsEndpoint()
        {
            UserModel currentUser = GetCurrentUser();

            return Ok($"Hi {currentUser.Username} how are you?");
        }

        
        private UserModel GetCurrentUser()
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            
            if(identity != null)
            {
                var userClaims = identity.Claims;


                return new UserModel
                {
                    Username = userClaims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value,
                };
            }

            return null;
        }
    }
}
