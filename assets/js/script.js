///8c63c426femshe9811d1e49b1267p1f0839jsn4563f7d2b10f
//api key ^
var pagebuildnumber = 0;
var frontpageContainer = document.getElementById("frontpage");
var drinkslistContainer = document.getElementById("drinkslist");
var landingpageContainer = document.getElementById("landingpage");

//building drink landing page
function buildDrinkpage(){
var currentCocktail = "";
var currentCocktailIMG = "";
var drinkID = "11007";

frontpageContainer.setAttribute("style", "display:none");
//link has to be made before calling the function
var fetchLink = "https://the-cocktail-db.p.rapidapi.com/lookup.php?i=" + drinkID;
//calling the function to run


function getCocktail(){
fetch(fetchLink, {
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
//landingpageContainer is already grabbed styled after the functions called
landingpageContainer.setAttribute("class", "row");
landingpageContainer.setAttribute("style", "height:600px");

//Img creating and appending
var cocktailImg = document.createElement("img");
cocktailImg.setAttribute("class", "col s4");
cocktailImg.setAttribute("src", currentCocktailIMG);
landingpageContainer.appendChild(cocktailImg);

//work in progress
//But same idea as the image
var cocktailStepsContainer = document.createElement("div");
cocktailStepsContainer.setAttribute("class", "col s4");
console.log(currentCocktail);
var cocktailStepsHeader = document.createElement("h1");
cocktailStepsHeader.textContent = currentCocktail;
cocktailStepsContainer.appendChild(cocktailStepsHeader);
landingpageContainer.appendChild(cocktailStepsContainer);
}


}

//builds list of drinks based on selected find tab alcohol

//event listner to trigger the building of the page
var dropdownContainer = document.getElementById("myDropdown");
dropdownContainer.addEventListener("click", function(event){
	var element = event.target;
	if (element.id != "myDropdown") {
		buildcardlist(element.id);
	}
})
//functions for building the list
function buildcardlist(alcohol){
	//setting the other screens to none
	frontpageContainer.setAttribute("style", "display:none");
	landingpageContainer.setAttribute("style", "display:none");
	drinkslistContainer.setAttribute("style", "display:block");

	//using the ingrediant pressed
fetch("https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + alcohol, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
		"x-rapidapi-key": "8c63c426femshe9811d1e49b1267p1f0839jsn4563f7d2b10f"
	}
})
.then(response => {
	//converting it to json 
	response.json().then(function(data) {
		buildcards(data);
		console.log(data);
	})
})
.catch(err => {
	console.error(err);
});

function buildcards(list){
	
	//current attempt to delete the last list of cards
	if(pagebuildnumber > 0){
		lastpagebuilt = pagebuildnumber;
		lastpage = document.getElementById(lastpagebuilt);
		console.log(lastpage);
		lastpage.remove();
		lastpage.setAttribute("style", "display:none;");
	}
	pagebuildnumber++;


	//making container for the cards
	var cardsContainer = document.createElement("div");
	cardsContainer.setAttribute("id", pagebuildnumber);
	console.log(pagebuildnumber);
	cardsContainer.setAttribute("class", "pure-u-4-5");
	cardsContainer.setAttribute("style", "diplay:flex; margin-left:10%;");
	drinkslistContainer.appendChild(cardsContainer);


	//w3school card template
	// <div class="card">
	// <img src="img_avatar.png" alt="Avatar" style="width:100%">
	// <div class="container">
	// 	<h4><b>John Doe</b></h4> 
	// </div>
	// </div>
	

	//creates the cards using the information from the list 
	for (var i = 0; i < list.drinks.length; i++) {
		var element = list.drinks[i];
		var card = document.createElement("div");
		card.setAttribute("id", element.idDrink);
		card.setAttribute("class", "pure-u-1-4");
		cardsContainer.appendChild(card);
		var cardimg = document.createElement("img");
		cardimg.setAttribute("style", "width:100%");
		cardimg.setAttribute("alt", element.strDrink);
		cardimg.setAttribute("src", element.strDrinkThumb);
		card.appendChild(cardimg);
		var textContainer = document.createElement("div");
		textContainer.setAttribute("class", "container");
		textContainer.setAttribute("id", element.idDrink);
		card.appendChild(textContainer);
		var cardName = document.createElement("h4");
		cardName.textContent = element.strDrink;
		textContainer.appendChild(cardName);
	}
}
}


//creating landing page
drinkslistContainer.addEventListener("click", function(event){
	var element = event.target;
	console.log(element.parentNode);
	console.log(element.parentNode.id);
	landingpageid = element.parentNode.id;
	landingpage(landingpageid);
	
})

function landingpage(id){
	frontpageContainer.setAttribute("style", "display:none");
	drinkslistContainer.setAttribute("style", "display:none");
	landingpageContainer.setAttribute("style", "display:block");

	fetch("https://the-cocktail-db.p.rapidapi.com/lookup.php?i=" + id, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
		"x-rapidapi-key": "3876f11e8cmsh0c41f0235972ef6p1d5e0ejsnba4aeabf583b"
	}
})
.then(response => {
	//converting it to json 
	response.json().then(function(data) {
		console.log(data);
	})
})
.catch(err => {
	console.error(err);
});


}