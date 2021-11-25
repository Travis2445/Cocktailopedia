//
var currentCocktail = "";
function buildCockTailPage(){
    
randomCocktail();


//Building landing page
var mainContainer = document.querySelector("main");
mainContainer.setAttribute("class", "row");
mainContainer.setAttribute("style", "height:600px");

var cocktailImg = document.createElement("img");
cocktailImg.setAttribute("class", "col s4");
var cocktailStepsContainer = document.createElement("div");
cocktailStepsContainer.setAttribute("class", "col s4");
console.log(currentCocktail);

var cocktailStepsList = document.createElement("ul");

//8c63c426femshe9811d1e49b1267p1f0839jsn4563f7d2b10f

}

function randomCocktail(){
fetch("https://the-cocktail-db.p.rapidapi.com/random.php", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
		"x-rapidapi-key": "8c63c426femshe9811d1e49b1267p1f0839jsn4563f7d2b10f"
	}
})
.then(response => {
	response.json().then(function(data) {
		currentCocktail = data.drinks[0].strDrink;
		console.log(data);
	})
})
.catch(err => {
	console.error(err);
});
}

buildCockTailPage();
//this is how the data turns managable 
// .then(response => {
// 	response.json().then(function(data) {
// 		console.log(data);
// 	})
// })