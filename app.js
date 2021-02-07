const search = document.getElementById('search');
search.addEventListener('click', function () {
    const foodName = document.getElementById('foodInput').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ foodName }`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('foods').innerHTML = "";
            document.getElementById('foodsData').innerHTML = ' ';
            const foods = document.getElementById('foods');
            data.meals.forEach(element => {
                const food = document.createElement('div')
                food.innerHTML = `
            <img src="${ element.strMealThumb }" onClick="handlefoodClick(${ element.idMeal })">
            <h1 onClick="handlefoodClick(${ element.idMeal })" >${ element.strMeal }</h1>
            `;
                food.className = "card";
                foods.appendChild(food);
            });
        })
        .catch(error => {
            console.log(error);
            document.getElementById('foods').innerHTML = "";
            document.getElementById('foodsData').innerHTML = ' ';
            const foods = document.getElementById('foods');
            const notFound = document.createElement('h1')
            notFound.innerHTML = `Sorry this item not found...Try again!`;
            foods.appendChild(notFound);
        })
})

let handlefoodClick = foodId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ foodId }`)
        .then(res => res.json())
        .then(data => {
            let foodData = document.getElementById('foodsData');
            document.getElementById('foodsData').innerHTML = ' ';
            document.getElementById('foodsData').style.display = 'block';
            let foodDetails = document.createElement('div')
            foodDetails.innerHTML = `
            <img src="${ data.meals[0].strMealThumb }">
            <h1>${ data.meals[0].strMeal }</h1>
            <br>
            <h1>Category: ${ data.meals[0].strCategory }</h1>
            <br>
            <h3>📌 ${ data.meals[0].strIngredient1 }</h3>
            <h3>📌 ${ data.meals[0].strIngredient2 }</h3>
            <h3>📌 ${ data.meals[0].strIngredient3 }</h3>
            <h3>📌 ${ data.meals[0].strIngredient4 }</h3>
            <h3>📌 ${ data.meals[0].strIngredient5 }</h3>
            <h3>📌 ${ data.meals[0].strIngredient6 }</h3>
            `;
            foodDetails.className = "food-details";
            foodData.appendChild(foodDetails);
        })
}
