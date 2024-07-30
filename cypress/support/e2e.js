Cypress.Commands.add("dragAndDrop", (sourceRect, targetPosition) => {
  cy.document().trigger("mousedown", {
    button: 0,
    clientX: sourceRect.left + sourceRect.width / 2,
    clientY: sourceRect.top + sourceRect.height / 2,
  });

  cy.document().trigger("mousemove", {
    clientX: targetPosition.x,
    clientY: targetPosition.y,
  });

  cy.document().trigger("mouseup", { force: true });
});
