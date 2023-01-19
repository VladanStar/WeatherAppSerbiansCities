let url = "https://api.openweathermap.org/data/2.5/forecast?";
let apiId = "&appid=1b1d0ad1ab386b48e8311d1e61b27554";
let citiesUrls = [];

$(document).ready(function () {
  let cities = [
    "Nis",
    "Belgrade",
    "Kragujevac",
    "Cacak",
    "Subotica",
    "Novi Sad",
    "Apatin",
    "Kraljevo",
    "Krusevac",
    "Negotin",
  ];

  for (let i in cities) {
    let city = "q=" + cities[i];
    let unit = "&units=metric";
    let mode = "&mode=json";
    let cityUrl = url + city + unit + mode + apiId;
    citiesUrls.push(cityUrl);

    fetch(cityUrl)
      .then((response) => response.json())
      .then((data) => show(data));
  }

  $("#date").datepicker({
    maxDate: "+4d",
  });

  $("#cityBtn").click(function () {
    $("#cityResult").empty();

    let unit = document.getElementById("unit").value;
    let city = document.getElementById("city").value;
    let inputDate = document.getElementById("date").value;
    let date = new Date(inputDate).getDate();

    let apiUrl = url + "q=" + city + "&units=" + unit + "&mode=json" + apiId;

    if ($("#date").val() == "") {
      $("#cityResult").html("<h1>Molim, unesite datum</h1>");
    } else {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => prikaz(data));

      function prikaz(data) {
        for (let i in data.list) {
          let dt = new Date(data.list[i].dt * 1000);
          if (dt.getDate() == date) {
            show(data, true);
            break;
          }
        }
      }
    }
  });
});

function show(data, city) {
  let weatherResult = document.getElementById("weatherResult");
  let weatherDiv = document.createElement("div");
  weatherDiv.setAttribute("class", "weatherDiv");

  let forCity = document.createElement("p");
  forCity.innerHTML = "<h2>Weather for " + data.city.name + "</h2>";
  weatherDiv.appendChild(forCity);

  let descriptionDiv = document.createElement("div");
  icon.setAttribute("src", "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png")
  descriptionDiv.setAttribute("class", "descriptionDiv");

  let weather = document.createElement("p");
  weather.innerHTML = data.list[0].weather[0].main;
  descriptionDiv.appendChild(weather);

  let description = document.createElement("p");
  description.innerHTML = data.list[0].weather[0].description;
  descriptionDiv.appendChild(description);

  let temperature = document.createElement("p");
  temperature.setAttribute("class", "temp");
  temperature.innerHTML = "<h2>" + data.list[0].main.temp + " <h2>";
  descriptionDiv.appendChild(temperature);

  weatherDiv.appendChild(descriptionDiv);
  weatherResult.appendChild(weatherDiv);

  let option = document.createElement("option");
  option.value = data.city.name;
  option.innerHTML = data.city.name;
  document.getElementById("city").appendChild(option);

  if (city) {
    document.getElementById("cityResult").appendChild(weatherDiv);
  }
}
