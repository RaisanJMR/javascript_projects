const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');
// console.log(mealsEl);

// search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();
  //   clear single meal
  single_mealEl.innerHTML = '';
  const term = search.value;
  // check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        if (data.meals === null) {
          resultHeading.innerHTML = `<h1>'${term}' is invalid</h1>`;
          mealsEl.innerHTML = '';
        } else {
          resultHeading.innerHTML = `<h1>${data.meals.length} results for your search . . .</h1>`;
          mealsEl.innerHTML = data.meals
            .map(
              (meal) =>
                //     `<div class="meal">
                //  <img src="${meal.strMealThumb}" alt="meal-str"/>
                //  <div class="meal-info" data-mealId="${meal.idMeal}">
                //  <h3>${meal.strMeal}</h3>
                //  </div>
                //  </div>`
                `
            <div class="wrapper" data-mealId="${meal.idMeal}">
            <div class="thumb">
              <img
                src="${meal.strMealThumb}"
                alt="image"
                width="85"
                height="85"
              />
            </div>
            <div class="details">
              <h2 class="heading">${meal.strMeal}</h2>
              <p class="desc">${meal.strArea} - ${meal.strCategory}</p>
              <p>
                <i class="fas fa-star"></i> <span class="rating">4.0</span>
                <span id="rating-number">(121 ratings)</span>
              </p>
            </div>
            <span id="heart"><i class="far fa-heart"></i> </span>
          </div>
            `
            )
            .join('');
          // Clear search value
          search.value = '';
        }
      });
  } else {
    resultHeading.innerHTML = `<h1>please enter your search item</h1>`;
  }
}
// Fetch meal by Id
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}
// Fetch random meal from API
function getRandomMeal() {
  // Clear meals and heading
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}
// add meal To DOM
function addMealToDOM(meal) {
  const ingredients = [];
  // console.log(ingredients);
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
  <div class="single-meal">
    <div class="single-meal-1">
      <h1>${meal.strMeal}</h1>
      <img src=${meal.strMealThumb} alt=${meal.strMeal}/>
    ${`<p>${meal.strCategory ? meal.strCategory : ''}-${
      meal.strArea ? meal.strArea : ''
    }</p>`}
    </div>
    <div class="single-meal-2">
      <p>${meal.strInstructions}</p>
    </div>
  </div>
    <div class="single-meal-3">
      <h1>Ingredients</h1>
      <ul>
      ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
      </ul>
    </div>
  
  `;
}
// Event Listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('wrapper');
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
});


