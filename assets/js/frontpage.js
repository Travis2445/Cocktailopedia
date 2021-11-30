var frontrandomname = document.getElementById("frontpagename");
var frontrandomimg = document.getElementById("frontpageimg");
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
		frontrandomimg.setAttribute("src", data.drinks[0].strDrinkThumb);
		console.log(response);
	})
})
	.catch(err => {
		console.error(err);
	});
}
frontpageCocktail();