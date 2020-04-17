import { expect } from "chai";
import { shallowMount, mount } from "@vue/test-utils";
import CocktailCard from "@/components/CocktailCard.vue";

describe("CocktailCard.vue", () => {
  it("renders a cocktail name when props passed", () => {
    const cocktailName = "My unique cocktail";
    const cocktail = { strDrink: cocktailName };
    const wrapper = shallowMount(CocktailCard, {
      propsData: { cocktail }
    });

    expect(wrapper.text()).to.include(cocktailName);
  });

  it("applies the image src and alt text when props passed", () => {
    const imgSrc = "./myImg.png";
    const altText = "My Cocktail Image";
    const cocktail = {
      strDrink: altText,
      strDrinkThumb: imgSrc
    };
    const wrapper = shallowMount(CocktailCard, {
      propsData: { cocktail }
    });

    const cardImage = wrapper.find("img");

    expect(cardImage.attributes("src")).to.equal(imgSrc);
    expect(cardImage.attributes("alt")).to.equal(altText);
  });

  it("emits the id of the cocktail when clicked", async () => {
    const idDrink = "34985";
    const cocktail = {
      idDrink
    };
    const wrapper = mount(CocktailCard, {
      propsData: { cocktail }
    });

    wrapper.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("cardClicked")).to.have.length(1);
    expect(wrapper.emitted("cardClicked")[0][0]).to.equal(idDrink);
  });
});
