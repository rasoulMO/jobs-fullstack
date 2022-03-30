/* eslint-disable no-undef */
describe("render home page", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("should render home page", () => {
		cy.get("#container").should("exist");
	});
});
