<template>
  <div class="app-body">
    <div class="header">
      <h2>Some Cocktail Database</h2>
    </div>
    <CocktailList :cocktails="cocktailList" />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Prop, Vue } from "vue-property-decorator";
import CocktailList from "./CocktailList.vue";

@Component({
  components: {
    "CocktailList": CocktailList
  }
})
export default class Home extends Vue {
  private cocktailList: Array<object> = [];

  async created() {
    const cocktailList = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail");
    this.cocktailList = cocktailList.data.drinks;
  }
}
</script>

<style scoped>
.header {
  background-color: rgb(16, 14, 23);
  color: lightseagreen;
  position: fixed;
  display: block;
  top: 0;
  width: 100%;
  font-family: 'Baloo Tamma 2', cursive;
}
</style>
