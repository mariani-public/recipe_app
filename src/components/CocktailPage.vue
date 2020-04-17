<template>
  <div>
    <h2>{{ cocktail.strDrink }}</h2>
    <img :src="cocktail.strDrinkThumb" :alt="cocktail.strDrink" />
    <h3>Ingredients</h3>
    <p v-for="(ingredient, index) in cocktailIngredients" :key="index">
      {{ ingredient }}
    </p>
    <h3>Steps</h3>
    <p>{{ cocktail.strInstructions }}</p>
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
  }) readonly cocktail!: { [key: string]: string | null};

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

<style lang="css" scoped></style>
