using Microsoft.EntityFrameworkCore;
using WorkoutTrackerAPI.Models;

namespace WorkoutTrackerAPI.Models
{
    public class ExercisesDbContext : DbContext
    {
        public ExercisesDbContext(DbContextOptions<ExercisesDbContext> options) : base(options) { }

        public DbSet<ExerciseModel> Exercises { get; set; }

        public DbSet<WorkoutModel> Workouts { get; set; }

        public DbSet<WorkoutExercises> WorkoutExercises { get; set; }
    }
}
