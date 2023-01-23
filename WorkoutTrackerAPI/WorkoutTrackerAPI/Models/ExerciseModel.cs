using MessagePack;
using System.ComponentModel.DataAnnotations;

namespace WorkoutTrackerAPI.Models
{
    public class ExerciseModel
    {
        [System.ComponentModel.DataAnnotations.Key]
        public string Name { get; set; }
        public string Muscle { get; set; }
        public string Difficulty { get; set; }
        public string Description { get; set; }
        public string Equipment { get; set; }
    }
}
