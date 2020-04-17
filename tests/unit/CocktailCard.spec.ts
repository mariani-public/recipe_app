import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import CocktailCard from "@/components/CocktailCard.vue";

describe("CocktailCard.vue", () => {
  it("renders a cocktail name when props passed", () => {
    const cocktailName = "My unique cocktail";
    const cocktail = { strDrink: cocktailName };
    const wrapper = shallowMount(CocktailCard, {
      propsData: { cocktail }
    });

    expect(wrapper.text()).to.include(cocktailName)
  });
});
