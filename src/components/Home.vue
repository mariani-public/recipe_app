<template>
  <div>
    <div class="header">
      <h2>Some Cocktail Database</h2>
    </div>
    <div>
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
import CocktailList from "./CocktailList.vue";
import CocktailPage from "./CocktailPage.vue";

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
}
</script>

<style scoped>
.header {
  background-color: rgb(16, 14, 23);
  color: lightseagreen;
  /* position: fixed;
  display: block;
  top: 0;
  left: 0; */
  width: 100%;
  font-family: "Baloo Tamma 2", cursive;
}

.app-body {
  display: flex;
  flex-direction: column;
}
</style>
