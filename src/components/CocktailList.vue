<template>
  <div class="grid-list">
    <CocktailCard v-for="cocktail in cocktails" :cocktail="cocktail" :key="cocktail.idDrink" @cardClicked="listItemAction" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CocktailCard from "./CocktailCard.vue";

@Component({
  components: {
    CocktailCard
  }
})
export default class CocktailList extends Vue {
  @Prop({ required: true, default: () => { return [] } }) readonly cocktails!: Array<object>

  private listItemAction(recipeId: string) {
    this.$emit("listItemClicked", recipeId);
  }
}
</script>

<style scoped>
.grid-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-row-gap: 10px;
}
</style>
