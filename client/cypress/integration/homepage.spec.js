/* eslint-disable no-undef */
describe("render home page", () => {
	beforeEach(() => {
		cy.visit("/projects");
	});

	it("should render home page", () => {
		cy.get("#container").should("exist");
	});
});
