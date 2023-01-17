using Microsoft.EntityFrameworkCore;

namespace WorkoutTrackerAPI.Models
{
    public class WorkoutTrackerDbContext : DbContext
    {
        public WorkoutTrackerDbContext(DbContextOptions<WorkoutTrackerDbContext> options) : base(options) { }


        public DbSet<UserModel> Users { get; set; }
    }
}
