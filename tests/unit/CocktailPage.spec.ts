import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import CocktailPage from "@/components/CocktailPage.vue";

describe("CocktailPage.vue", () => {
  const cocktail = {
    strDrink: "Gimlet",
    strIngredient1: "Gin",
    strMeasure1: "3 oz.",
    strIngredient2: "Lime Cordial",
    strMeasure2: "1 oz",
    strDrinkThumb: "./gimletImg.png",
    strInstructions: "Add the ingredients to a shaker and shake. Serve in a chilled coupe."
  };

  it("should render a cocktail name", () => {
    const wrapper = shallowMount(CocktailPage, {
      propsData: {
        cocktail
      }
    });
    const renderedText = wrapper.find('[data-qa-id="name"]').text();

    expect(renderedText).to.include(cocktail.strDrink);
  });

  it("should render a cocktail image", () => {
    const wrapper = shallowMount(CocktailPage, {
      propsData: {
        cocktail
      }
    });
    const image = wrapper.find('[data-qa-id="image"]');

    const renderedImg = image.attributes("src");
    const renderedAlt = image.attributes("alt");

    expect(renderedImg).to.include(cocktail.strDrinkThumb);
    expect(renderedAlt).to.include(cocktail.strDrink);
  });

  // it("should render a list of cocktail ingredients", () => {});

  it("should render cocktail instructions", () => {
    const wrapper = shallowMount(CocktailPage, {
      propsData: {
        cocktail
      }
    });
    const renderedText = wrapper.find('[data-qa-id="instructions"]').text();

    expect(renderedText).to.include(cocktail.strInstructions);
  });
});
