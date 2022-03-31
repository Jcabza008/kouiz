using Microsoft.AspNetCore.Mvc;
using kmserver.Models;
using kmserver.Services;
using kmserver.Utils;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace kmserver.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizzesController : ControllerBase
    {
        private readonly IQuizzesService quizzesService;
        private const int questionIDLength = 16;

        public QuizzesController(IQuizzesService _quizzesService)
        {
            quizzesService = _quizzesService;
        }

        // GET: api/quizzes
        [HttpGet]
        public ActionResult<List<Quiz>> Get()
        {
            return quizzesService.Get();
        }

        // GET api/quizzes/{id}
        [HttpGet("{id}")]
        public ActionResult<Quiz> Get(string _Id)
        {
            return quizzesService.Get(_Id);
        }

        // POST api/quizzes
        [HttpPost]
        public ActionResult<Quiz> Post([FromBody] Quiz _Quiz)
        {
            foreach (var q in _Quiz.Questions)
            {
                q.Id = RandomStringGenerator.Generate(questionIDLength);
            }
            return quizzesService.Create(_Quiz);
        }

        [HttpPut]
        // PUT api/quizzes
        public ActionResult<Quiz> Put([FromBody] Quiz _Quiz)
        {
            return quizzesService.Update(_Quiz);
        }

        // DELETE api/quizzes/{id}
        [HttpDelete("{id}")]
        public void Delete(string _Id)
        {
            quizzesService.Remove(_Id);
        }

        // DELETE api/quizzes
        [HttpDelete]
        public void Delete([FromBody] Quiz _Quiz)
        {
            quizzesService.Remove(_Quiz);
        }
    }
}
