var frontrandomname = document.getElementById("frontpagename");
var frontrandomimg = document.getElementById("frontpageimg");

var frontpageContainer = document.getElementById("frontpage");
var drinkslistContainer = document.getElementById("drinkslist");
var landingpageContainer = document.getElementById("landingpage");

frontpageContainer.setAttribute("style", "display:block");
drinkslistContainer.setAttribute("style", "display:none");
landingpageContainer.setAttribute("style", "display:none");
function frontpageCocktail(){
	fetch("https://the-cocktail-db.p.rapidapi.com/random.php", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
		"x-rapidapi-key": "8c63c426femshe9811d1e49b1267p1f0839jsn4563f7d2b10f"
	}
	})
	.then(response => {
	response.json().then(function(data){
		frontrandomname.textContent = data.drinks[0].strDrink;
		frontrandomname.setAttribute("id", data.drinks[0].idDrink);
		frontrandomimg.setAttribute("src", data.drinks[0].strDrinkThumb);
	})
})
	.catch(err => {
		console.error(err);
	});
}

frontpageCocktail();