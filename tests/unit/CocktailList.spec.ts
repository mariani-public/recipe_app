import { expect } from "chai";
import { mount } from "@vue/test-utils";
import CocktailList from "@/components/CocktailList.vue";

describe("CocktailList.vue", () => {
  const cocktails = [
    {
      idDrink: "1234",
      strDrink: "Cocktail 1",
      strDrinkThumb: "img1.png"
    },
    {
      idDrink: "5678",
      strDrink: "Cocktail 2",
      strDrinkThumb: "img2.png"
    },
    {
      idDrink: "1357",
      strDrink: "Cocktail 3",
      strDrinkThumb: "img3.png"
    }
  ];

  it("renders a list of cocktail cards when props passed", () => {
    const wrapper = mount(CocktailList, {
      propsData: { cocktails }
    });

    const cocktailCards = wrapper.findAll("[data-qa-name='cocktail-card']");

    expect(cocktailCards.length).to.equal(cocktails.length);
  });
});
