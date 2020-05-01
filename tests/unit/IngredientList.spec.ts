import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import IngredientList from "@/views/IngredientList.vue";

describe("IngredientList.vue", () => {
  it("renders an empty ingredient list", () => {
    const ingredientList: Array<string> = [];
    const wrapper = shallowMount(IngredientList, {
      methods: {
        fetchIngredients() {
          return ingredientList;
        }
      }
    });

    const emptyListText = wrapper
      .find('[data-qa-id="empty-ingredient-list"]')
      .text();
    const ingredients = wrapper.findAll('[data-qa-name="ingredient"]');
    expect(emptyListText).to.contain(
      "You haven't added any ingredients to your list!"
    );
    expect(ingredients.length).to.equal(0);
  });

  it("renders an ingredient list", () => {
    const ingredientList = [
      "1 oz bourbon",
      "2 splashes Orange Bitters",
      "2oz Lemon juice"
    ];
    const wrapper = shallowMount(IngredientList, {
      methods: {
        fetchIngredients() {
          return ingredientList;
        }
      }
    });

    const emptyListText = wrapper.find('[data-qa-id="empty-ingredient-list"]');
    const ingredients = wrapper.findAll('[data-qa-name="ingredient"]');
    expect(emptyListText.exists()).to.be.false;
    expect(ingredients.length).to.equal(3);
  });
});
