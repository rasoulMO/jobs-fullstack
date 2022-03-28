/* eslint-disable no-undef */
describe("render projects page", () => {
	it("should render projects page", () => {
		cy.visit("/projects");
		cy.get("#container").should("exist");
		cy.get(".input").type("project 2");
	});
});
