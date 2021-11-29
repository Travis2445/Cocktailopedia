///8c63c426femshe9811d1e49b1267p1f0839jsn4563f7d2b10f
var currentCocktail = "";
var currentCocktailIMG = "";

var mainContainer = document.querySelector("main");

randomCocktail();

function randomCocktail(){
fetch("https://the-cocktail-db.p.rapidapi.com/random.php", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
		"x-rapidapi-key": "8c63c426femshe9811d1e49b1267p1f0839jsn4563f7d2b10f"
	}
})
.then(response => {
	//After converting it to json set global scope functions to values to use when building the page
	response.json().then(function(data) {
		currentCocktail = data.drinks[0].strDrink;
		currentCocktailIMG = data.drinks[0].strDrinkThumb;
		//after getting the data we call the build function
		//if we call the fetch function in the buildpage function it doesn't catch the data before running
		buildCockTailPage();
		console.log(data);
	})
})
.catch(err => {
	console.error(err);
});
}

function buildCockTailPage(){

//Building landing page
//mainContainer is already grabbed styled after the functions called
mainContainer.setAttribute("class", "row");
mainContainer.setAttribute("style", "height:600px");

//Img creating and appending
var cocktailImg = document.createElement("img");
cocktailImg.setAttribute("class", "col s4");
cocktailImg.setAttribute("src", currentCocktailIMG);
mainContainer.appendChild(cocktailImg);

//work in progress
//But same idea as the image
var cocktailStepsContainer = document.createElement("div");
cocktailStepsContainer.setAttribute("class", "col s4");
console.log(currentCocktail);
var cocktailStepsHeader = document.createElement("h1");
cocktailStepsHeader.textContent = currentCocktail;
cocktailStepsContainer.appendChild(cocktailStepsHeader);
mainContainer.appendChild(cocktailStepsContainer);


}

