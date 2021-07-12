const movieListGet = document.querySelector("#film-list");
const genreSelect = document.querySelector("nav");
let genreSearch = document.querySelector("#search");
let resultMoviesList = [];

movies.forEach(function (item) {
  const filmURL = "https://www.imdb.com/title/" + item.imdbID + "/";
  item.ImdbURL = filmURL;
});

const makeMovieList = choice => {
  console.log("in makeMovieList: " + choice);

  if (choice === "nieuwste-films") {
    resultMoviesList = movies.filter((item) => item.Year >= 2014);
  } else {
    for (i = 0; i < movies.length; i++) {
      if (movies[i].Title.toLowerCase().includes(choice)) {
        resultMoviesList.push(movies[i]);
      }
    }
  }
  listSelectedFilms(choice);
};

const listSelectedFilms = () => {
  resultMoviesList.forEach((item) => {

    let li = document.createElement("li");
    let filmLi = movieListGet.appendChild(li);

    let filmcardDiv = document.createElement("div");
    filmcardDiv.className += "filmcard";
    let filmcard = filmLi.appendChild(filmcardDiv);

    let filmcardInnerDiv = document.createElement("div");
    filmcardInnerDiv.className += "filmcard__inner";
    let filmcardInner = filmcard.appendChild(filmcardInnerDiv);

    let filmcardFrontDiv = document.createElement("div");
    filmcardFrontDiv.className += "filmcard__front";
    let filmcardFront = filmcardInner.appendChild(filmcardFrontDiv);

    filmcardFront.innerHTML +=
      "<img src='" + item.Poster + "' alt='" + item.Title + "'></img>";

    let filmcardBackDiv = document.createElement("div");
    filmcardBackDiv.className += "filmcard__back";
    let filmcardBack = filmcardInner.appendChild(filmcardBackDiv);

    let filmcardTitleClass = document.createElement("h3");
    filmcardTitleClass.className += "filmcard__title";
    let filmcardTitle = filmcardBack.appendChild(filmcardTitleClass);

    let filmcardYearClass = document.createElement("p");
    filmcardYearClass.className += "filmcard__year";
    let filmcardYear = filmcardBack.appendChild(filmcardYearClass);

    let filmcardTypeClass = document.createElement("p");
    filmcardTypeClass.className += "filmcard__type";
    let filmcardType = filmcardBack.appendChild(filmcardTypeClass);

    let filmcardImdbIDClass = document.createElement("button");
    filmcardImdbIDClass.className += "filmcard__ImdbID";
    let filmcardImdbID = filmcardBack.appendChild(filmcardImdbIDClass);
    filmcardTitle.innerHTML += item.Title;
    filmcardYear.innerHTML += item.Year;
    filmcardType.innerHTML += item.Type;
    filmcardImdbID.innerHTML +=
      "<a href='" + item.ImdbURL + "' target='_blank'>Klik hier voor meer informatie<br>over deze film op: www.imdb.com</a>";
  });

  resultMoviesList = [];
};

genreSelect.addEventListener("click", selectBtn);

function selectBtn() {
  let btnSelector = document.querySelector('input[name="genre"]:checked');
  if (btnSelector === null) {
    return;
  }

  const radioBtn = btnSelector.value;

  clearList();

  makeMovieList(radioBtn);
}

// Code for the search field

let typingTimer;
const doneTypingInterval = 500;
let myInput = document.getElementById("search");

myInput.addEventListener("keyup", () => {
  genreSelect.removeEventListener("click", selectBtn);

  clearList();
  clearTimeout(typingTimer);
  myInput.value.toLowerCase();
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
  genreSelect.addEventListener("click", selectBtn);
});

function doneTyping() {

  console.log(myInput.value);

  makeMovieList(myInput.value.toLowerCase());
}

function clearList() {
  const parent = document.getElementById("film-list");
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
  if (myInput.value.toLowerCase() === "zoek een titel") {
    myInput.value.toLowerCase() = " ";
  }
}

makeMovieList('');
