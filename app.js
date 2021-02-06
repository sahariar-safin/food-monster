const search = document.getElementById('search');
search.addEventListener('click', function () {
    const foodName = document.getElementById('foodInput').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ foodName }`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('foods').innerHTML = "";
            document.getElementById('foodsData').innerHTML = ' ';
            const catagorys = document.getElementById('foods');
            data.meals.forEach(element => {
                const catagory = document.createElement('div')
                catagory.innerHTML = `
            <img src="${ element.strMealThumb }" onClick="handleCatagoryClick(${ element.idMeal })">
            <h1 onClick="handleCatagoryClick(${ element.idMeal })" >${ element.strMeal }</h1>
            `;
                catagory.className = "card";
                catagorys.appendChild(catagory);
            });
        })
})

let handleCatagoryClick = foodId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ foodId }`)
        .then(res => res.json())
        .then(data => {
            console.log(data.meals[0]);
            let catagoryData = document.getElementById('foodsData');
            document.getElementById('foodsData').innerHTML = ' ';
            document.getElementById('foodsData').style.display = 'block';
            let catagoryDetails = document.createElement('div')
            catagoryDetails.innerHTML = `
            <img src="${ data.meals[0].strMealThumb }">
            <h1>${ data.meals[0].strMeal }</h1>
            <br>
            <h1>Catagory: ${ data.meals[0].strCategory }</h1>
            <br>
            <h3>📌 ${ data.meals[0].strMeasure1 }</h3>
            <h3>📌 ${ data.meals[0].strMeasure2 }</h3>
            <h3>📌 ${ data.meals[0].strMeasure3 }</h3>
            <h3>📌 ${ data.meals[0].strMeasure4 }</h3>
            <h3>📌 ${ data.meals[0].strMeasure5 }</h3>
            <h3>📌 ${ data.meals[0].strMeasure6 }</h3>
            `;
            catagoryDetails.className = "catagory-details";
            catagoryData.appendChild(catagoryDetails);
        })
}
