namespace StitchBlender.Server.Models.Patterns
{
    public class Pattern
    {
        public string Name { get; set; } = string.Empty;
        public string Id { get; set; } = string.Empty;
        public bool BuiltIn { get; set; } = false;
        public ICollection<PatternRow> Rows { get; set; } = new List<PatternRow>();
    }
}
