using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace kmserver.Models
{
    [BsonDiscriminator("Quiz")]
    public class Quiz
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("ownerID")]
        public string OwnerID { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("questions")]
        public ICollection<Question> Questions { get; set; }

        public Quiz(string id, string ownerID, string name, ICollection<Question> questions)
        {
            Id = id;
            OwnerID = ownerID;
            Name = name;
            Questions = questions;
        }
    }

    [BsonDiscriminator("Question")]
    public class Question
    {
        [BsonElement("id")]
        public string? Id { get; set; }

        [BsonElement("prompt")]
        public string Prompt { get; set; }

        [BsonElement("answer")]
        public string Answer { get; set; }

        [BsonElement("keywords")]
        public List<string>? Keywords { get; set; }

        [BsonElement("order")]
        public int Order { get; set; }

        public Question(string id, string prompt, string answer, int order)
        {
            Id = id;
            Prompt = prompt;
            Answer = answer;
            Order = order;
        }
    }
}