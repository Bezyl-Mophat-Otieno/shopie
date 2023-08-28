describe("Single Product", () => {
  it("On single click of a product it should naviaget to the single product page", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(3000);
    cy.get(".my-shop-products").find(".product").should("have.length.gt", 0);
    cy.get(".product").first().click();
  });
  it("The single product page should have a product image and description", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(3000);
    cy.get(".my-shop-products").find(".product").should("have.length.gt", 0);
    cy.get(".product").first().click();
    cy.get(".product-img").should("be.visible");
    cy.get(".product-details").should("be.visible");
  });
});
