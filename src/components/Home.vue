<template>
  <div>
    <div class="header">
      <div class="page-header" data-qa-id="header">
        <span @click="goBack" class="go-back" v-if="showDetail">&larr;</span>
        <div style="margin: 0 auto">Some Cocktail Database</div>
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
    <div class="content">
      <CocktailList
        :cocktails="cocktailList"
        @listItemClicked="fetchRecipe"
        v-if="!showDetail"
      />

      <CocktailPage :cocktail="cocktail" v-if="showDetail" />
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
import CocktailList from "@/components/CocktailList.vue";
import CocktailPage from "@/components/CocktailPage.vue";

@Component({
  components: {
    CocktailList,
    CocktailPage
  }
})
export default class Home extends Vue {
  private cocktailList: Array<object> = [];
  private showDetail = false;
  private cocktail: object = {};
  private searchType = "cocktail";
  private searchString = "";

  async created() {
    const cocktailList = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
    );

    this.cocktailList = cocktailList.data.drinks;
  }

  private async fetchRecipe(recipeId: string) {
    const cocktail = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`
    );

    this.cocktail = cocktail.data.drinks[0];
    this.showDetail = true;
  }

  private async goBack() {
    const cocktailList = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
    );

    this.cocktailList = cocktailList.data.drinks;
    this.showDetail = false;
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
    this.showDetail = false;
    this.searchString = "";
  }
}
</script>

<style scoped lang="scss">
.header {
  background-color: rgb(16, 14, 23);
  color: lightseagreen;
  width: 100%;
  font-family: "Baloo Tamma 2", cursive;
  text-align: center;

  position: fixed;
  top: 0;
  left: 0;
}

.page-header {
  display: flex;
  align-items: center;

  font-size: 30px;
  font-weight: 500;
}

.go-back {
  margin-left: 10px;

  &:hover {
    cursor: pointer;
  }
}

.app-body {
  display: flex;
  flex-direction: column;
}

.content {
  padding-top: 110px;
}
</style>
