describe("Drag and Drop Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should allow dragging and dropping of cards", () => {
    cy.get('[data-testid="todo-column"]').as("todoColumn");
    cy.get('[data-testid="doing-column"]').as("doingColumn");

    cy.get("@todoColumn")
      .find('[data-testid^="board-card"]')
      .then((cards) => {
        const initialOrder = [...cards].map((card) => card.innerText.trim());
        cy.log("Initial Order:", initialOrder);

        cy.get("@todoColumn")
          .find('[data-testid^="board-card"]')
          .first()
          .as("cardToDrag")
          .then(($cardToDrag) => {
            const card = $cardToDrag[0];
            const cardRect = card.getBoundingClientRect();

            cy.get("@doingColumn").then(($doingColumn) => {
              const column = $doingColumn[0];
              const columnRect = column.getBoundingClientRect();

              cy.dragAndDrop(cardRect, {
                x: columnRect.left + columnRect.width / 2,
                y: columnRect.top + columnRect.height / 2,
              }).then(() => {
                cy.get("@todoColumn")
                  .find('[data-testid^="board-card"]')
                  .then((updatedCards) => {
                    const updatedOrder = [...updatedCards].map((card) =>
                      card.innerText.trim()
                    );
                    cy.log("Updated Order:", updatedOrder);

                    expect(updatedOrder).to.have.all.members(initialOrder);

                    cy.get("@doingColumn")
                      .find('[data-testid^="board-card"]')
                      .then((cardsInDoing) => {
                        const cardsText = [...cardsInDoing].map((card) =>
                          card.innerText.trim()
                        );
                        cy.log("Cards in Doing Column:", cardsText);
                        expect(cardsText).to.include(initialOrder[0]);
                      });
                  });
              });
            });
          });
      });
  });
});
