/* eslint-disable no-undef */
describe("render home page", () => {
	it("should render home page", () => {
		cy.visit("/");
		cy.get("#container").should("exist");
	});
});
