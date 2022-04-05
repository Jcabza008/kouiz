using System.Collections.Generic;
using kmserver.Models;


namespace kmserver.Services
{
    public interface IQuizzesService
    {
        List<Quiz> Get();

        Quiz Get(string _Id);

        Quiz Create(Quiz _Quiz);

        Quiz Update(Quiz _Quiz);

        void Remove(Quiz _Quiz);

        void Remove(string _Id);
    }
}