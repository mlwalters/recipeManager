namespace api.Models
{
    public class InstructionResponse
    {
        public int Id { get; set; }
        public string Step { get; set; }
        public int StepNumber { get; set; }
    }

    public class AddInstruction
    {
        public int Id { get; set; }
        public string Step { get; set; }
        public int StepNumber { get; set; }
        public int RecipeId { get; set; }
    }
}
    