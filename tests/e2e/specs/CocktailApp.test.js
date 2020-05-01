describe("Cocktail App", function() {
  beforeEach(function() {
    cy.fixture("cocktail").as("cocktailData");
  });

  it("should visit the app root url", function() {
    cy.visit("/");

    cy.get("[data-qa-id='header']").should(
      "contain",
      this.cocktailData.databaseTitle
    );
  });

  it("should open a cocktail detail", function() {
    const cocktailCard = cy.contains(
      "[data-qa-name='cocktail-card']",
      this.cocktailData.cocktailName
    );

    cocktailCard.click();

    cy.get("[data-qa-id='name']").should(
      "contain",
      this.cocktailData.cocktailName
    );
  });

  it("should navigate back to the original list", function() {
    cy.get("[data-qa-id='header'] span.go-back").click();

    cy.get("[data-qa-id='name']").should("not.exist");
  });

  it("should search by ingredient", function() {
    cy.get("input[value='ingredient']").click();
    cy.get("input[type='text']").type(this.cocktailData.ingredientSearchString);
    cy.contains("button", "Search").click();

    cy.contains(
      "[data-qa-name='cocktail-card']",
      this.cocktailData.cocktailName
    ).should("have.length", 1);
  });

  it("should search by cocktail", function() {
    cy.get("input[value='cocktail']").click();
    cy.get("input[type='text']").type(this.cocktailData.cocktailSearchString);
    cy.contains("button", "Search").click();
    cy.wait(1000);

    cy.get("[data-qa-name='cocktail-card']").each(card => {
      cy.wrap(card).should("contain", this.cocktailData.cocktailSearchString);
    });
  });

  it("should add an ingredient to the ingredient list", function() {
    cy.get("input[value='cocktail']").click();
    cy.get("input[type='text']").type(this.cocktailData.cocktailName);
    cy.contains("button", "Search").click();
    cy.wait(1000);
    const cocktailCard = cy.contains(
      "[data-qa-name='cocktail-card']",
      this.cocktailData.cocktailName
    );
    cocktailCard.click();

    cy.contains("button", "Add to Ingredient List").click();
    cy.contains("span", "Ingredient List").click();

    const ingredients = cy.get('[data-qa-name="ingredient"]');
    ingredients.should("have.length", 1);
    ingredients.should("contain", "Gin");
  });

  it("should remove an ingredient from the ingredient list", function() {
    cy.contains("button", "Delete Ingredient").click();

    const ingredients = cy.get('[data-qa-name="ingredient"]');
    ingredients.should("have.length", 0);
  });
});
