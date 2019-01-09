//obiekty przechowujące dane dot. wyboru gracza i ai oraz statystyki
const choices = {
    playerChoice: "",
    aiChoice: "",
};

const stats = {
    games: 0,
    win: 0,
    draw: 0,
    loss: 0,
};

const choicesTable = ["cell", "songo", "buu"];

const gameBtn = document.querySelector('button');
const imgs = document.querySelectorAll('.imgs img');
const winnerSpan = document.querySelector('#winner');

//spany wyboru
const playerChoiceSpan = document.querySelector('#playerChoice');
const playerLastChoiceSpan = document.querySelector('#playerLastChoice');
const aiChoiceSpan = document.querySelector('#aiChoice');

//spany statystyk
const gamesSpan = document.querySelector('p.games span');
const winsSpan = document.querySelector('p.wins span');
const drawSpan = document.querySelector('p.draws span');
const lossSpan = document.querySelector('p.losses span');

//alert
const alertPopUp = document.querySelector('.popUpAlert');
const alertSpan = alertPopUp.querySelector('p');
const closeAlertBtns = alertPopUp.querySelectorAll(".closePopUp");


//zegar
const timeSpan = document.querySelector('.clock p:nth-child(2)');
let timerInterval;
let timerCounter = 1000;

const timer = () => {
    timerCounter--;
    timeSpan.innerHTML = (timerCounter / 100).toFixed(2);
    if (timerCounter <= 0){
        stats.games++;
        gamesSpan.innerHTML = stats.games;
        stats.loss++;
        lossSpan.innerHTML = stats.loss;
        clearInterval(timerInterval);
        alertPopUp.classList.add("popUpActive");
        alertSpan.innerHTML = "Czas się skończył, przegrałeś tę grę. Naciśnij OK, aby spróbować jeszcze raz.";
        gameBtn.classList.remove("activeBtnAnim");
    }
};

const startTimer = () => {
    timerInterval = setInterval(timer, 10);
};
//funkcja ma się wywoływać od razu po odpaleniu gry, a potem za każdym razem, gdy gracz rozpocznie rozgrywkę
startTimer();

//funkcja wyboru gracza
const playerChoice = function () {
    //zapisanie wyboru gracza
    choices.playerChoice = this.dataset.option;

    //animacja buttonu gry
    gameBtn.classList.add("activeBtnAnim");

    //drukowanie wyboru gracza
    if (this.dataset.option === "cell"){
        playerChoiceSpan.innerHTML = "Komórczak";
    } else if (this.dataset.option === "songo"){
        playerChoiceSpan.innerHTML = "Songo";
    } else {
        playerChoiceSpan.innerHTML = "Bubu";
    }

    //zaznaczenie wyboru gracza
    if (this.classList.contains("active")) {
        this.classList.remove("active");
        choices.playerChoice = "";
        playerChoiceSpan.innerHTML = "";
        gameBtn.classList.remove("activeBtnAnim");
    } else {
        imgs.forEach(el => el.classList.remove("active"));
        this.classList.add("active");
    }
};

//funckja drukująca ostatni wybor gracza
const lastChoice = (choice) => {
    if (choice === "cell"){
        playerLastChoiceSpan.innerHTML = "Komórczak";
    } else if (choice === "songo"){
        playerLastChoiceSpan.innerHTML = "Songo";
    } else {
        playerLastChoiceSpan.innerHTML = "Bubu";
    }
};

//odpalenie funkcji wyboru gracza
imgs.forEach(el => el.addEventListener("click", playerChoice));

//wybór AI
const aiChoice = () => {
    choices.aiChoice = choicesTable[Math.floor(Math.random() * 3)];
};

//funckcja drukująca wybór AI

const aiLastChoice = (choice) => {
    if (choice === "cell"){
        aiChoiceSpan.innerHTML = "Komórczak";
    } else if (choice === "songo"){
        aiChoiceSpan.innerHTML = "Songo";
    } else {
        aiChoiceSpan.innerHTML = "Bubu";
    }
};

//funkcja porównująca wyniki
const whoWon = (player, ai) => {
    if (player === "cell" && ai === "buu" || player === "songo" && ai === "cell" || player === "buu" && ai === "songo") {
        return "playerWon";
    } else if (player === ai) {
        return "draw";
    } else {
        return "aiWon";
    }
};

//funkcja zliczająca statystyki i drukująca wyniki
const result = (result) => {
    stats.games++;
    gamesSpan.innerHTML = stats.games;
      if (result === "playerWon"){
          stats.win++;
          winsSpan.innerHTML = stats.win;
          winnerSpan.innerHTML = "Zwycięstwo!";
          winnerSpan.style.color = "green";
      } else if (result === "draw"){
          stats.draw++;
          drawSpan.innerHTML = stats.draw;
          winnerSpan.innerHTML = "remis";
          winnerSpan.style.color = "black";
      } else {
          stats.loss++;
          lossSpan.innerHTML = stats.loss;
          winnerSpan.innerHTML = "Porażka";
          winnerSpan.style.color = "red";
      }
};

//funkcja zamknięcia alertu
const closeAlert = () => {
    alertPopUp.classList.remove("popUpActive");
    reset();
    startTimer();
};
closeAlertBtns.forEach(el => el.addEventListener("click", closeAlert));

//animacje
const redBar = document.querySelector('.redBar');
const battleBcg = document.querySelector('section.battle');
const imgRing = battleBcg.querySelector('img:nth-child(1)');
const playerImg = battleBcg.querySelector(".playerImg");
const aiImg = battleBcg.querySelector(".aiImg");
const divThunder = battleBcg.querySelector(".battleThunder");
const resultBanner = battleBcg.querySelector(".resultBanner");
const resultBannerBcg = battleBcg.querySelector(".resulbcg");
const closeResultBtn = resultBanner.querySelector('button');

//funckcja animująca elementy
const animations = (player, ai, result) => {
      redBar.classList.add("redBarAnim");
      battleBcg.style.display = "block";
      battleBcg.classList.add("bcgAnim");
      imgRing.classList.add("ringAnim");
      if (player === "cell"){
          playerImg.src = "./img/cellPlayer.png"
      } else if (player === "songo"){
          playerImg.src = "./img/songoPlayer.png"
      } else {
          playerImg.src = "./img/buuPlayer.png"
      }
      playerImg.classList.add("playerAnim");
      if (ai === "cell"){
          aiImg.src = "./img/cellAi.png"
      } else if (ai === "songo"){
          aiImg.src = "./img/songoAi.png"
      } else {
          aiImg.src = "./img/buuAi.png"
      }
      aiImg.classList.add("aiAnim");
      divThunder.classList.add("thunderAnim");
      const resultBannerTimeout = () => {
          resultBanner.style.display = "block";
          if (result === "playerWon"){
            resultBannerBcg.style.backgroundImage = "url('./img/sun.png')";
            resultBanner.style.color = "white";
            resultBanner.style.boxShadow = "0 0 10rem greenyellow";
            resultBanner.querySelector("h1").innerHTML = "Zwycięstwo!";
            resultBanner.querySelector("p").innerHTML = "Pokonałeś swojego przeciwnika";
          } else if (result === "draw"){
              resultBannerBcg.style.backgroundImage = "none";
              resultBanner.style.color = "black";
              resultBanner.style.boxShadow = "none";
              resultBanner.querySelector("h1").innerHTML = "Remis";
              resultBanner.querySelector("p").innerHTML = "Pojedynek zakończony bez rozstrzgnięcia";
          } else {
              resultBannerBcg.style.backgroundImage = "url('./img/blood.png')";
              resultBanner.style.color = "black";
              resultBanner.style.boxShadow = "0 0 10rem red";
              resultBanner.querySelector("h1").innerHTML = "Porażka";
              resultBanner.querySelector("p").innerHTML = "Zostałeś pokonany.";
          }
      };
      setTimeout(resultBannerTimeout, 4000);
};

//funkcja resetu ustawień po skończonej rozgrywce
const reset = () => {
    choices.playerChoice = "";
    choices.aiChoice = "";
    playerChoiceSpan.innerHTML = "";
    imgs.forEach(el => el.classList.remove("active"));
    timerCounter = 1000;
    gameBtn.classList.remove("activeBtnAnim");
};

//głowna funkcja gry
const main = () => {
    if (choices.playerChoice === ""){
        clearInterval(timerInterval);
        alertPopUp.classList.add("popUpActive");
        alertSpan.innerHTML = "Nie wybrałeś żadnej postaci. Spróbuj jeszcze raz.";
        return;
    }
    aiChoice();
    clearInterval(timerInterval);
    animations(choices.playerChoice, choices.aiChoice, whoWon(choices.playerChoice, choices.aiChoice));
};

gameBtn.addEventListener("click", main);

//funkcja resetu animacji i rozgrywki po wyświetleniu animacji
const resetAnimations = () => {
    redBar.classList.remove("redBarAnim");
    battleBcg.style.display = "none";
    battleBcg.classList.remove("bcgAnim");
    resultBanner.style.display = "none";
    lastChoice(choices.playerChoice,);
    aiLastChoice(choices.aiChoice);
    result(whoWon(choices.playerChoice, choices.aiChoice));
    reset();
    startTimer();
};
closeResultBtn.addEventListener("click", resetAnimations);

