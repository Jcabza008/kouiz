using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using kmserver.Models;
using System.Collections.Generic;
using NLog;

namespace kmserver.Services
{
    public class QuizzesService : IQuizzesService
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        public IMongoCollection<Quiz> Quizzes;

        public QuizzesService(IConfiguration config)
        {
            var dbConfig = config.GetSection("MongoDB");
            string dbCollection = "quizzes";

            if (BsonClassMap.IsClassMapRegistered(typeof(Quiz)) == false)
            {
                BsonClassMap.RegisterClassMap<Quiz>();
            }

            var client = new MongoClient(dbConfig.GetValue<string>("ConnectionString"));
            var database = client.GetDatabase(dbConfig.GetValue<string>("Database"));
            Quizzes = database.GetCollection<Quiz>(dbCollection);
        }

        public List<Quiz> Get()
        {
            return Quizzes.Find(quiz => true).ToList();
        }

        public Quiz Get(string _id)
        {
            return Quizzes.Find(quiz => quiz.Id == _id).FirstOrDefault();
        }

        public Quiz Create(Quiz _quiz)
        {
            Quizzes.InsertOne(_quiz);
            return _quiz;
        }

        public Quiz Update(Quiz _quiz)
        {
            Quizzes.ReplaceOne(quiz => quiz.Id == _quiz.Id, _quiz);
            return _quiz;
        }

        public void Remove(Quiz _quiz)
        {
            Quizzes.DeleteOne(quiz => quiz.Id == _quiz.Id);
        }

        public void Remove(string _id)
        {
            Quizzes.DeleteOne(quiz => quiz.Id == _id);
        }
    }
}