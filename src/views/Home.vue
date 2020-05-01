<template>
  <div>
    <div class="header">
      <div class="page-header" data-qa-id="header">
        <div style="margin: 0 auto; padding-left: 200px;">Some Cocktail Database</div>
        <span @click="openIngredientList" style="cursor: pointer; margin-right: 10px;">Ingredient List</span>
      </div>

      <div>
        <input
          type="text"
          v-model="searchString"
          placeholder="Enter search text..."
          @keyup.enter="search"
        />
        <button type="button" @click="search">Search</button>

        <div class="searchTypes">
          <input
            type="radio"
            id="cocktail"
            name="search-options"
            value="cocktail"
            v-model="searchType"
          />
          <label for="cocktail">Cocktail</label>

          <input
            type="radio"
            id="ingredient"
            name="search-options"
            value="ingredient"
            v-model="searchType"
          />
          <label for="ingredient">Ingredient</label>
        </div>
      </div>
    </div>

    <CocktailList
      :cocktails="cocktailList"
      @listItemClicked="openRecipe"
      class="content"
    />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
import CocktailList from "@/components/CocktailList.vue";

@Component({
  components: {
    CocktailList
  }
})
export default class Home extends Vue {
  private cocktailList: Array<object> = [];
  private cocktail: object = {};
  private searchType = "cocktail";
  private searchString = "";

  async created() {
    const cocktailList = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
    );

    this.cocktailList = cocktailList.data.drinks;
  }

  private openRecipe(recipeId: string) {
    this.$router.push({
      name: "cocktail",
      params: {
        id: recipeId
      }
    });
  }

  private async search() {
    let cocktailList;
    if (this.searchType === "cocktail") {
      cocktailList = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.searchString}`
      );
    } else {
      cocktailList = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.searchString}`
      );
    }

    this.cocktailList = cocktailList.data.drinks;
    this.searchString = "";
  }

  private openIngredientList() {
    this.$router.push({
      name: "ingredients"
    })
  }
}
</script>

<style scoped lang="scss">
.content {
  padding-top: 110px;
}
</style>
