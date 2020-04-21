<template>
  <div>
    <div class="header">
      <div class="page-header">
        <span @click="goBack" class="go-back" v-if="showDetail">&larr;</span>
        <div style="margin: 0 auto">Some Cocktail Database</div>
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
  padding-top: 60px;
}
</style>
