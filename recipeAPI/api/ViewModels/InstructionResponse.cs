namespace api.Models
{
    public class InstructionResponse
    {
        public int Id { get; set; }
        public string Step { get; set; }
        public int StepNumber { get; set; }
    }

    public class InstructionRequest
    {        
        public ICollection<InstructionResponse> Instructions { get; set; }
    }
}
    