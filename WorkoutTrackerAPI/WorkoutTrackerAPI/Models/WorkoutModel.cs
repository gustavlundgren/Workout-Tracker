using System.ComponentModel.DataAnnotations;

namespace WorkoutTrackerAPI.Models
{
    public class WorkoutModel
    {
        [System.ComponentModel.DataAnnotations.Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string User { get; set; } 

        public List<ExerciseModel> Exercises { get; set; }
    }
}
