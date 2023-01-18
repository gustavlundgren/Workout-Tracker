using Microsoft.EntityFrameworkCore;
using WorkoutTrackerAPI.Models;

namespace WorkoutTrackerAPI.Models
{
    public class WorkoutTrackerDbContext : DbContext
    {
        public WorkoutTrackerDbContext(DbContextOptions<WorkoutTrackerDbContext> options) : base(options) { }


        public DbSet<UserModel> Users { get; set; }


        public DbSet<WorkoutTrackerAPI.Models.UserDto> UserDto { get; set; }
    }
}
