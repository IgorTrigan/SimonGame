let level = 1;
let buttonColors = ["green", "yellow", "red", "blue"];
let gamePattern = [];
$(document).on("touchstart keydown", function () {
  startGame(level);
});


function startGame(level) {
  $(document).off("keydown touchstart");
  $("h1").text("level " + level);
  createGamePattern(level);
  setTimeout(function () {
    animateGamePattern(gamePattern);
  }, 500);
}

function createGamePattern(level) {
  gamePattern = [];
  for (let i = 0; i < level; i++) {
    let random = Math.floor(Math.random() * 4);
    gamePattern.push(buttonColors[random]);
  }
  return;
}

function animateGamePattern(array, i = 0) {
  let currentColor = array[i];
  if (i <= array.length) {
    $("#" + currentColor).addClass("pressed");
    let sound = new Audio("sounds/" + currentColor + ".mp3");
    sound.play();
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
      setTimeout(function () {
        animateGamePattern(gamePattern, i + 1);
      }, 500);
    }, 500);
  } else {
    return startGuessing(gamePattern);
  }
}

function startGuessing(gamePattern) {
  let userClickPattern = [];

  $(".btn").on("click", function (e) {
    userClickPattern.push($(this).attr("id"));
    animateClicked($(this).attr("id"));
    let CurrentClick = checkCurrentClick(gamePattern, userClickPattern);

    if (gamePattern.length <= userClickPattern.length) {
      $(".btn").off("click");

      setTimeout(function () {
        level += 1;
        startGame(level);
      }, 500);
    }
  });
}

function animateClicked(currentColor) {
  $("#" + currentColor).addClass("pressed");
  let sound = new Audio("sounds/" + currentColor + ".mp3");
  sound.play();
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 500);
  return;
}

function checkCurrentClick(gamePattern, userClickPattern) {
  if (
    gamePattern[userClickPattern.length - 1] !==
    userClickPattern[userClickPattern.length - 1]
  ) {
    $(".btn").off("click");
    $("h1").text("Game Over, Press any key to Restart");

    let sound = new Audio("sounds/wrong.mp3");
    sound.play();

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $(document).on("keydown touchstart", (e) => {
      level = 1;
      startGame(1);
    });
    return false;
  }
  return true;
}
