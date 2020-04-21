<template>
  <div class="card" @click="cardAction(cocktail.idDrink)">
    <img :src="cocktail.strDrinkThumb" :alt="cocktail.strDrink" width="200px" height="200px" />
    <div>{{ cocktail.strDrink }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CocktailCard extends Vue {
  @Prop({ required: true, default: () => { return {} } }) readonly cocktail!: object;

  private cardAction(cocktailId: string): void {
    this.$emit("cardClicked", cocktailId)
  }
}
</script>


<style scoped lang="scss">
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  min-width: 225px;
  max-width: 225px;
  min-height: 240px;
  max-height: 240px;
  padding: 5px 0px 5px 0px;
  border-radius: 3px;
  font-family: 'Open Sans', sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  text-align: center;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.4);
  }
}
</style>
