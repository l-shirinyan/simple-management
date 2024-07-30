describe("FilterBoard Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should display the search input", () => {
    cy.get("#search").should("exist");
    cy.get("#search").should("be.visible");
    cy.get("#search").should("have.attr", "placeholder", "Search procedure");
  });

  it("should display dropdowns with filter options", () => {
    cy.get("#filter_options").should("exist");

    cy.get(".dropdown").first().should("contain.text", "Select assigneer");
    cy.get(".dropdown").last().should("contain.text", "Select tags");
  });

  it("should display the date picker", () => {
    cy.get('input[placeholder="Select Date"]').should("exist");
    cy.get('input[placeholder="Select Date"]').should("be.visible");
  });

  it("should select a date and verify the value", () => {
    cy.get('input[placeholder="Select Date"]').click();

    cy.get(".datepicker").should("be.visible");

    cy.get(".datepicker button").first().click();

    cy.wait(500);

    cy.get('input[placeholder="Select Date"]').should("exist");

    cy.get('input[placeholder="Select Date"]')
      .invoke("val")
      .then((value) => {
        cy.log(`Current value: ${value}`);
      });
  });
});
