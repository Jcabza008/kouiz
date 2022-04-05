using Xunit;
using Moq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using kmserver.Controllers;
using kmserver.Models;
using kmserver.Services;
namespace kmserver.tests;

public class QuizzesControllerTests
{
    [Fact]
    public void TestGetNotNull()
    {
        //Arrange
        var _quizzesServiceMock = new Mock<IQuizzesService>();
        _quizzesServiceMock.Setup(m => m.Get()).Returns(new List<Quiz>{ new Quiz("id", "owner", "name", new List<Question>()) });

        var quizzesController = new QuizzesController(_quizzesServiceMock.Object);

        //Act
        var response = quizzesController.Get();

        //Assert
        Assert.NotNull(response.Value);
    }
}