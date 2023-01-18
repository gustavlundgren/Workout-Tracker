using Microsoft.AspNetCore.Connections;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using WorkoutTrackerAPI.Models;

namespace WorkoutTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static UserModel user = new UserModel();
        private readonly IConfiguration _configuration;
        private readonly WorkoutTrackerDbContext _context;

        public AuthController(IConfiguration configuration, WorkoutTrackerDbContext context)
        {
            _configuration= configuration;
            var connString = _configuration.GetConnectionString("MyContext");
            _context = context;
        }

        // GET
        // api/Auth/GetUsers
        [HttpPost("GetUsers")]
        public async Task<ActionResult<List<UserModel>>> GetAll(string token)
        {
            if(CheckTokenIsValid(token))
            {
                return await _context.Users.ToListAsync();
            }

            return StatusCode((int)HttpStatusCode.Forbidden);
        }

        public static long GetTokenExpirationTime(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(token);
            var tokenExp = jwtSecurityToken.Claims.First(claim => claim.Type.Equals("exp")).Value;
            var ticks = long.Parse(tokenExp);
            return ticks;
        }

        public static bool CheckTokenIsValid(string token)
        {
            var tokenTicks = GetTokenExpirationTime(token);
            var tokenDate = DateTimeOffset.FromUnixTimeSeconds(tokenTicks).UtcDateTime;

            var now = DateTime.Now.ToUniversalTime();

            var valid = tokenDate >= now;

            return valid;
        }

        // GET BY ID
        // api/Auth/GetAccount/Id
        [HttpGet("GetUser/{Id}", Name = "Get")]
        public async Task<IActionResult> GetUser(int Id)
        {
            var userModel = await _context.Users.FindAsync(Id);

            if (userModel == null)
            {
                return NotFound();
            }

            return Ok(userModel);
        }

        // REFRESH
        // api/Auth/refresh
        [HttpPost("refresh")]
        public async Task<ActionResult<string>> Refresh(UserDto request)
        {
            UserModel user = GetUserByUsername(request.Username);

            if(user == null)
            {
                return NotFound();
            }

            user.Token = CreateToken(user, 10);
            return Ok(user);
        }


        // REGISTER
        // api/Auth/register
        [HttpPost("register")]
        public async Task<ActionResult<UserModel>> Register(UserDto request)
        {
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            UserModel newUser = new UserModel();
            List<UserModel> users = await _context.Users.ToListAsync();

            foreach(UserModel user in users) 
            { 
                if(user.Username == request.Username) 
                {
                    return StatusCode((int)HttpStatusCode.Conflict);
                }
            }

            newUser.Username = request.Username;
            newUser.Email = request.Email;
            newUser.PasswordHash= passwordHash;
            newUser.PasswordSalt= passwordSalt;
            newUser.Token = string.Empty;

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = newUser.Id }, newUser);
        }

        // LOGIN
        // api/Auth/login
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDto request)
        {
            List<UserModel> users = await _context.Users.ToListAsync();
            
            foreach(UserModel user in users) { 
                if(user.Username == request.Username)
                {
                    if(!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
                    {
                        return BadRequest("Wrong password");
                    } 
                    else
                    {
                        user.Token = CreateToken(user, 20);
                        return Ok(user);
                    }
                }
            }

            return BadRequest("User not found");
        }

        private string CreateToken(UserModel user, int time)
        {
            List<Claim> claims = new List<Claim>();
            
            claims.Add(new Claim(ClaimTypes.Name, user.Username));

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddSeconds(time),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
             
            return jwt;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt) 
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                return computedHash.SequenceEqual(passwordHash);
            }
        }

         // TODO - kanske göra till en get function
        private UserModel GetUserByUsername(string username) 
        {
            List<UserModel> users = _context.Users.ToList();
            
            foreach (UserModel user in users) 
            {
                if(username == user.Username) return user;
            }

            return null;
        }
    }
}
