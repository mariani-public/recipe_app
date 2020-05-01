<template lang="html">
  <div>
    <div class="header">
      <div class="page-header" data-qa-id="header">
        <span @click="goBack" class="go-back">&larr;</span>
        <div style="margin: 0 auto;">Some Cocktail Database</div>
      </div>
    </div>
    <div class="content">
      <div class="content-header">
        Ingredient List
      </div>
      <div v-if="ingredients.length > 0">
        <div
          class="ingredient-list"
          v-for="(ingredient, index) in ingredients"
          :key="index"
          data-qa-name="ingredient"
        >
          <button
            style="margin-right: 30px; border-radius: 5px;"
            @click="deleteIngredient(index)"
          >
            Delete Ingredient
          </button>
          <p>{{ ingredient }}</p>
        </div>
      </div>
      <p v-else data-qa-id="empty-ingredient-list">
        You haven't added any ingredients to your list!
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class IngredientList extends Vue {
  private ingredients: Array<string> = [];

  private goBack() {
    this.$router.push({
      name: "Home"
    });
  }

  private deleteIngredient(index: number) {
    const existingIngredientList = [...this.ingredients];
    const newIngredientList = [
      ...existingIngredientList.slice(0, index),
      ...existingIngredientList.slice(index + 1)
    ];

    localStorage.setItem("ingredients", JSON.stringify(newIngredientList));
    this.ingredients = newIngredientList;
  }

  private fetchIngredients(): Array<string> {
    return JSON.parse(localStorage.getItem("ingredients") || "") || [];
  }

  created() {
    this.ingredients = this.fetchIngredients();
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding-top: 50px;
}

.content-header {
  font-family: "Baloo Tamma 2", cursive;
  font-size: 30px;
  font-weight: 500;
}

.ingredient-list {
  display: flex;
  margin-bottom: 5px;
}
</style>
