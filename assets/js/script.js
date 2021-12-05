///8c63c426femshe9811d1e49b1267p1f0839jsn4563f7d2b10f
//api key ^
var pagebuildnumber = 0;
var savedDrinksNumber = 0;
var savedDrinksArray = [];
var frontpageContainer = document.getElementById("frontpage");
var drinkslistContainer = document.getElementById("drinkslist");
var landingpageContainer = document.getElementById("landingpage");
var saveddrinksContainer = document.getElementById("savedDrinks");

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
cocktailImg.setAttribute("id", "drink-img-id");
cocktailImg.setAttribute("src", currentCocktailIMG);
landingpageContainer.appendChild(cocktailImg);

//But same idea as the image
var cocktailStepsContainer = document.createElement("div");
cocktailStepsContainer.setAttribute("id", "drink-name-id");
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
		lastpage.remove();
		lastpage.setAttribute("style", "display:none;");
	}
	pagebuildnumber++;


	//making container for the cards
	var cardsContainer = document.createElement("div");
	cardsContainer.setAttribute("id", pagebuildnumber);
	cardsContainer.setAttribute("class", "pure-u-4-5");
	cardsContainer.setAttribute("style", "diplay:flex; margin-left:10%;");
	drinkslistContainer.appendChild(cardsContainer);

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
//if a card is selected
drinkslistContainer.addEventListener("click", function(event){
	var element = event.target;
	landingpageid = element.parentNode.id;
	landingpage(landingpageid);

})

//if the front page name is selected than landing page will also go
var frontcocktail = document.getElementById("frontpagename");
frontcocktail.addEventListener("click", function(event){
	var element = event.target;
	id = element.getAttribute("drinkid");
	landingpage(id);
})

//if the frontpage is selected

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
		buildlandingpage(data.drinks[0]);
	})
})
.catch(err => {
	console.error(err);
});


}
function buildlandingpage(drink){
	console.log(drink);
	//Changing the img and Name to match the selected drink
	imgLanding = document.getElementById("landingpageimg");
	imgLanding.setAttribute("src", drink.strDrinkThumb);
	nameLanding = document.getElementById("landingpageName");
	nameLanding.setAttribute("drinkid", drink.idDrink);
	nameLanding.textContent = drink.strDrink;
	//building an array of useable ingredients as well as the amounts
	var ingrediantArray = [];
	var measureArray = [];
	for (let i = 1; i < 16; i++) {
		var ingrediantitem = "strIngredient" + i;
		var itemamount = "strMeasure" + i;
		if(drink[itemamount] != null){
			measureArray.push(drink[itemamount])
		}
		if(drink[ingrediantitem] != null){
			ingrediantArray.push(drink[ingrediantitem]);
		}else{
			break;
		}
	}
	//puting in the ingredients in a list
	ingrediantlistLanding = document.getElementById("ingredientslist");
	for (let i = 0; i < ingrediantArray.length; i++) {
		prevExist = document.getElementById("ingrediant" + i);
		if(!prevExist){
			addIngrediant = document.createElement("li");
			addIngrediant.setAttribute("id", "ingrediant" + i);
		}else{
			addIngrediant = prevExist;
		}
		
		if(measureArray[i] != null){
			addIngrediant.textContent = ingrediantArray[i] + " " + measureArray[i];
		}else{
			addIngrediant.textContent = ingrediantArray[i];
		}
		if(!prevExist){
			ingrediantlistLanding.appendChild(addIngrediant);
		}
	}
	//glass type change
	glass = document.getElementById("glasstype");
	glass.textContent = drink.strGlass;

	//change directions
	drinkDirections = document.getElementById("directions");
	drinkDirections.textContent = drink.strInstructions;
}

//saving the drinks
var savedrink = document.getElementById("landingpageName");
savedrink.addEventListener("click", function(event){
	var element = event.target;
	id = element.getAttribute("drinkid");
	console.log(id);
	console.log(element);
	savedDrinksArray.push(id);
	console.log(savedDrinksArray);
})