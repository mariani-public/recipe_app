<template>
  <div>
    <div class="header">
      <div class="page-header" data-qa-id="header">
        <span @click="goBack" class="go-back">&larr;</span>
        <div style="margin: 0 auto; padding-left: 200px;">Some Cocktail Database</div>
        <span @click="openIngredientList" style="cursor: pointer; margin-right: 10px;">Ingredient List</span>
      </div>
    </div>
    <div class="content">
      <div class="detail-header" data-qa-id="name">
        {{ cocktail.strDrink }}
      </div>

      <div class="picture">
        <img
          :src="cocktail.strDrinkThumb"
          :alt="cocktail.strDrink"
          height="350px"
          data-qa-id="image"
        />
      </div>

      <div class="recipe-ingredients">
        <h3>Ingredients</h3>
        <ul class="ingredient-list">
          <li
            v-for="(ingredient, index) in cocktailIngredients"
            :key="index"
            data-qa-name="cocktail-ingredient"
          >
            <button @click="addToIngredientList(ingredient)" style="margin-right: 20px;">Add to Ingredient List</button>
            {{ ingredient }}
          </li>
        </ul>
      </div>

      <div class="recipe-instructions">
        <h3>Steps</h3>
        <p style="margin-left: 10px" data-qa-id="instructions">
          {{ cocktail.strInstructions }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CocktailPage extends Vue {
  private cocktail: { [key: string]: string | null } = {};

  get cocktailIngredients(): Array<string> {
    const cocktailIngredients = [];

    for (let i = 1; i <= 15; i++) {
      const ingredientNameKey = `strIngredient${i}`;
      const ingredientAmtKey = `strMeasure${i}`;

      if (this.cocktail[ingredientNameKey]) {
        const ingredientAmt = this.cocktail[ingredientAmtKey] ?? "";
        const ingredientName = this.cocktail[ingredientNameKey] ?? "";

        const ingredient = `${ingredientAmt.trim()} ${ingredientName.trim()}`;

        cocktailIngredients.push(ingredient);
      }
    }

    return cocktailIngredients;
  }

  async created() {
    const cocktail = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.$route.params.id}`
    );

    this.cocktail = cocktail.data.drinks[0];
  }

  private goBack() {
    this.$router.push({
      name: "Home"
    });
  }

  private openIngredientList() {
    this.$router.push({
      name: "ingredients"
    })
  }

  private addToIngredientList(ingredient: string) {
    const ingredientList = JSON.parse(localStorage.getItem('ingredients') || '') || [];
    const newIngredientList = [...ingredientList, ingredient];

    localStorage.setItem('ingredients', JSON.stringify(newIngredientList));
  }
}
</script>

<style lang="css" scoped>
.go-back {
  margin-left: 10px;

  &:hover {
    cursor: pointer;
  }
}

.content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 50px 350px 1fr;
  grid-template-areas:
    "title title"
    "image image"
    "ingredients instructions";
  grid-row-gap: 10px;

  color: rgb(16, 14, 23);
  padding-top: 60px;
}

.detail-header {
  grid-area: title;
  font-family: "Baloo Tamma 2", cursive;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
}

.picture {
  grid-area: image;
  justify-self: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
}

.recipe-ingredients {
  grid-area: ingredients;
  font-family: "Open Sans", sans-serif;
}

.recipe-instructions {
  grid-area: instructions;
  font-family: "Open Sans", sans-serif;
}

.ingredient-list {
  text-align: left;
  display: inline-block;
  margin-top: 0px;
}

ul {
  list-style-type: none;
}

h3 {
  margin-left: 10px;
}
</style>
