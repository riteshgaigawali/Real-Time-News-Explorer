var newsStories = new XMLHttpRequest(); // Creating a new HTTP request.
var newsObject; // This object will store data came from NewsAPI
var currentPage = 1; // Current page accessed by user.
var key = "cd96504d69bb4f03ad48e5cbfc2e3778"; // API Key generated from NewsAPI

// Function to get News according to category.
function loadNews(category) {
  var url =
    "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=in&apiKey=" +
    key;
  document.getElementById("nav1").className = "active";

  if (category === 1) {
    // featured
    url =
      "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=in&apiKey=" +
      key;
    document.getElementById("nav1").className = "active";
    document.getElementById("nav2").className = "";
    document.getElementById("nav3").className = "";
    document.getElementById("nav4").className = "";
    document.getElementById("nav5").className = "";
    document.getElementById("nav6").className = "";
    document.getElementById("nav7").className = "";
    currentPage = category;
  } else if (category === 2) {
    // tech
    url =
      "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=" +
      key;
    document.getElementById("nav1").className = "";
    document.getElementById("nav2").className = "active";
    document.getElementById("nav3").className = "";
    document.getElementById("nav4").className = "";
    document.getElementById("nav5").className = "";
    document.getElementById("nav6").className = "";
    document.getElementById("nav7").className = "";
    currentPage = category;
  } else if (category === 3) {
    // business
    url =
      "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=" +
      key;
    document.getElementById("nav1").className = "";
    document.getElementById("nav2").className = "";
    document.getElementById("nav3").className = "active";
    document.getElementById("nav4").className = "";
    document.getElementById("nav5").className = "";
    document.getElementById("nav6").className = "";
    document.getElementById("nav7").className = "";
    currentPage = category;
  } else if (category === 4) {
    // entertainment
    url =
      "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=" +
      key;
    document.getElementById("nav1").className = "";
    document.getElementById("nav2").className = "";
    document.getElementById("nav3").className = "";
    document.getElementById("nav4").className = "active";
    document.getElementById("nav5").className = "";
    document.getElementById("nav6").className = "";
    document.getElementById("nav7").className = "";
    currentPage = category;
  } else if (category === 5) {
    // health
    url =
      "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=" +
      key;
    document.getElementById("nav1").className = "";
    document.getElementById("nav2").className = "";
    document.getElementById("nav3").className = "";
    document.getElementById("nav4").className = "";
    document.getElementById("nav5").className = "active";
    document.getElementById("nav6").className = "";
    document.getElementById("nav7").className = "";
    currentPage = category;
  } else if (category === 6) {
    // science
    url =
      "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=" +
      key;
    document.getElementById("nav1").className = "";
    document.getElementById("nav2").className = "";
    document.getElementById("nav3").className = "";
    document.getElementById("nav4").className = "";
    document.getElementById("nav5").className = "";
    document.getElementById("nav6").className = "active";
    document.getElementById("nav7").className = "";
    currentPage = category;
  } else if (category === 7) {
    // sports
    url =
      "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=" +
      key;
    document.getElementById("nav1").className = "";
    document.getElementById("nav2").className = "";
    document.getElementById("nav3").className = "";
    document.getElementById("nav4").className = "";
    document.getElementById("nav5").className = "";
    document.getElementById("nav6").className = "";
    document.getElementById("nav7").className = "active";
    currentPage = category;
  }

  // Get news data
  newsStories.open("GET", url, true);
  newsStories.setRequestHeader("Accept", "application/json");
  newsStories.responseType = "text";
  newsStories.send(null);
} // End of function.

// Function loads news as the News are fetched from NewsAPI.
newsStories.onload = function () {
  var imgPath,
    i = 0,
    desc,
    diff,
    diffInHours,
    hoursRounded,
    pubDate,
    currentDate;
  if (newsStories.status === 200) {
    newsObject = JSON.parse(newsStories.responseText);
    console.log(newsObject);
    for (i; i < newsObject.articles.length; i += 1) {
      document.getElementById("headline-" + i).innerHTML =
        newsObject.articles[i].title;
      imgPath = newsObject.articles[i].urlToImage;
      if (imgPath !== null) {
        document.getElementById("headline-" + i + "-image").src = imgPath;
        document.getElementById("headline-" + i + "-image").style.display =
          "block";
      } else {
        document.getElementById("headline-" + i + "-image").style.display =
          "none";
      }
      desc = newsObject.articles[i].description;
      if (desc !== null && desc !== "") {
        if (desc.length <= 94) {
          desc = desc.substring(0, 94);
        } else {
          desc = desc.substring(0, 94) + "...";
        }
      }
      document.getElementById("description-" + i).innerHTML = desc;
      document.getElementById("source-" + i).innerHTML =
        newsObject.articles[i].source.name;
      pubDate = newsObject.articles[i].publishedAt;
      currentDate = new Date();
      diff = currentDate.valueOf() - Date.parse(pubDate);
      diffInHours = diff / 1000 / 60 / 60;
      if (diffInHours < 1) {
        hoursRounded = (diffInHours * 60).toFixed(0) + "m";
      } else if (diffInHours >= 24) {
        hoursRounded = (diffInHours / 24).toFixed(0) + "d";
      } else {
        hoursRounded = Math.floor(diffInHours) + "h";
      }
      document.getElementById("time-" + i).innerHTML = hoursRounded;
    }
  } // end if
}; // End of function.

// Function redirects user to source page of News.
function clickCard(articleNumber) {
  var storyUrl = newsObject.articles[articleNumber].url;
  window.open(storyUrl, "_blank");
} // End of function.

// Add event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  loadNews(1); // Assuming 1 is the default category you want to load on startup.
});
