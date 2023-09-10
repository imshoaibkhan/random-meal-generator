let get_Meal = document.getElementById("get_Meal");
let meal_container = document.getElementById("Meal");

get_Meal.addEventListener("click", () => {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((res) => {
      createMeal(res.meals[0]);
    })
    .catch((e) => {
      console.warn(e);
    });
});

let createMeal = (meal) => {
  const ingredients = [];

  for (i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  const newInnerHTML = `

<div class="main-box">

<div class="inner-box left">

    <img src="${meal.strMealThumb}" alt="Meal Image">

    ${
      meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ""
    }

    ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ""}

    ${
      meal.strTags
        ? `<p><strong>Tags:</strong> ${meal.strTags.split(",").join(", ")}</p>` : ""
    }

    <h5>Ingredients:</h5>
    <ul>
        ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
    </ul>
</div>
<div class="inner-box right">
    <h3>${meal.strMeal}</h3>
    <p>${meal.strInstructions}</p>
</div>

</div>

${
  meal.strYoutube
    ? `
    <div class="last-box">
        <h4>Video recipe:</h4>
        <div class="videowrapper">
            <iframe width="420" height="315"
            src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
            </iframe>
        </div>
    </div>`
    : ""
}`;
  meal_container.innerHTML = newInnerHTML;
};
