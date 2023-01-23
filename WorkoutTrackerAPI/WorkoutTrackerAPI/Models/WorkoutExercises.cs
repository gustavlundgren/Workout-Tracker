namespace WorkoutTrackerAPI.Models
{
    public class WorkoutExercises
    {
        public int Id { get; set; }

        public int WorkoutId { get; set; }

        public string ExerciseName { get; set; }
    }
}
