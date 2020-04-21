<template>
  <div class="page-grid">
    <div class="header" data-qa-id="name">
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
      <ul>
        <li v-for="(ingredient, index) in cocktailIngredients" :key="index">
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CocktailPage extends Vue {
  @Prop({
    required: true,
    default: () => {
      return {};
    }
  })
  readonly cocktail!: { [key: string]: string | null };

  get cocktailIngredients(): Array<string> {
    const cocktailIngredients = [];

    for (let i = 1; i <= 15; i++) {
      const ingredientNameKey = `strIngredient${i}`;
      const ingredientAmtKey = `strMeasure${i}`;

      if (this.cocktail[ingredientNameKey]) {
        const ingredient = `${this.cocktail[ingredientAmtKey]}${this.cocktail[ingredientNameKey]}`;

        cocktailIngredients.push(ingredient);
      }
    }

    return cocktailIngredients;
  }
}
</script>

<style lang="css" scoped>
.page-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 50px 350px 1fr;
  grid-template-areas:
    "title title"
    "image image"
    "ingredients instructions";
  grid-row-gap: 10px;

  color: rgb(16, 14, 23);
}

.header {
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

ul {
  list-style-type: circle;
}

h3 {
  margin-left: 10px;
}
</style>
