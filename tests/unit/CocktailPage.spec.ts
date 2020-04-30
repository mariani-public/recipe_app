import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import CocktailPage from "@/views/CocktailPage.vue";

describe("CocktailPage.vue", () => {
  const cocktail = {
    strDrink: "Gimlet",
    strIngredient1: "Gin",
    strMeasure1: "3 oz.",
    strIngredient2: "Lime Cordial",
    strMeasure2: "1 oz",
    strDrinkThumb: "./gimletImg.png",
    strInstructions:
      "Add the ingredients to a shaker and shake. Serve in a chilled coupe."
  };

  const $route = {
    params: {
      id: "123456"
    }
  };

  it("should render a cocktail name", () => {
    const wrapper = shallowMount(CocktailPage, {
      mocks: {
        $route
      },
      data() {
        return {
          cocktail
        };
      }
    });
    const renderedText = wrapper.find('[data-qa-id="name"]').text();

    expect(renderedText).to.include(cocktail.strDrink);
  });

  it("should render a cocktail image", () => {
    const wrapper = shallowMount(CocktailPage, {
      mocks: {
        $route
      },
      data() {
        return {
          cocktail
        };
      }
    });
    const image = wrapper.find('[data-qa-id="image"]');

    const renderedImg = image.attributes("src");
    const renderedAlt = image.attributes("alt");

    expect(renderedImg).to.include(cocktail.strDrinkThumb);
    expect(renderedAlt).to.include(cocktail.strDrink);
  });

  it("should render a list of cocktail ingredients", () => {
    const wrapper = shallowMount(CocktailPage, {
      mocks: {
        $route
      },
      data() {
        return {
          cocktail
        };
      }
    });
    const ingredients = wrapper.findAll('[data-qa-name="cocktail-ingredient"]');
    const firstIngredient = ingredients.at(0).text();
    const secondIngredient = ingredients.at(1).text();

    expect(firstIngredient).to.include(cocktail.strIngredient1).and.include(cocktail.strMeasure1);
    expect(secondIngredient).to.include(cocktail.strIngredient2).and.include(cocktail.strMeasure2);
  });

  it("should render cocktail instructions", () => {
    const wrapper = shallowMount(CocktailPage, {
      mocks: {
        $route
      },
      data() {
        return {
          cocktail
        };
      }
    });
    const renderedText = wrapper.find('[data-qa-id="instructions"]').text();

    expect(renderedText).to.include(cocktail.strInstructions);
  });
});
