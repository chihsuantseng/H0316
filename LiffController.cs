[ApiController]
[Route("api/liff")]
public class LiffController : ControllerBase
{
    [HttpGet("getLiffId")]
    public IActionResult GetLiffId()
    {
        string liffId = "2007067558-PaEYb4om"; // 你的 LIFF ID
        return Ok(new { liffId });
    }
}
