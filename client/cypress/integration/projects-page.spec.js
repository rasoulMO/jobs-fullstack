/* eslint-disable no-undef */

describe("render projects page", () => {
	beforeEach(() => {
		cy.visit("/projects");
	});

	it("should render projects page", () => {
		cy.get("#container").should("exist");
		cy.get(".input").type("project 2");
		// if we have some text on the dom, we can use the following
		// cy.findByText("project 2").should("exist");
	});
});
