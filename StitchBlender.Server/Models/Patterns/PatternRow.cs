namespace StitchBlender.Server.Models.Patterns
{
    public class PatternRow
    {
        public ICollection<PatternCell> Cells { get; set; } = new List<PatternCell>();
    }
}
