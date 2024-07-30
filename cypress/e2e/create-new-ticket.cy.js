describe("AddTicket Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should open the modal when the button is clicked", () => {
    cy.get("button").contains("Create a new procedure").click();
    cy.get("h5").contains("Create a new procedure").should("be.visible");
  });

  it("should close the modal when clicking the Cancel button", () => {
    cy.get("button").contains("Create a new procedure").click();
    cy.get("button").contains("Cancel").click();
    cy.get("h5").contains("Create a new procedure").should("not.exist");
  });

  it("should create a new procedure when form is filled out and submitted", () => {
    cy.get("button").contains("Create a new procedure").click();

    cy.get("#title").type("New Procedure Title");
    cy.get("#dropdown_type").should("have.text", "Todo");
    cy.get("#dropdown_priority").should("have.text", "Low");

    cy.get("#create_ticket").click();

    cy.get("h5").contains("Create a new procedure").should("not.exist");
  });
});
