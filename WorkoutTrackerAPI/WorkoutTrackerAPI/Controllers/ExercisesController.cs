using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WorkoutTrackerAPI.Models;

namespace WorkoutTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisesController : ControllerBase
    {
        private readonly ExercisesDbContext _context;
        private readonly IConfiguration _configuration;

        public ExercisesController(ExercisesDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetWorkouts()
        {
            UserModel currentUser = GetCurrentUser();

            var c = _context.Workouts.ToList();

            List<WorkoutModel> output = new();
            
            foreach (var w in c)
            {
                if(w.User == currentUser.Username)
                {
                    output.Add(w);
                }
            }

            return Ok(output);   
        }

        private UserModel GetCurrentUser()
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
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
