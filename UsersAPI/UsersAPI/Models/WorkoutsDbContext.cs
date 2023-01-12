using Microsoft.EntityFrameworkCore;

namespace UsersAPI.Models
{
    public class WorkoutsDbContext:DbContext
    {
        public WorkoutsDbContext(DbContextOptions<WorkoutsDbContext> options) : base(options) 
        { }

        public DbSet<UserModel> Users { get; set; }
    }
}
