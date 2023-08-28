describe("User Dashboard", () => {
  it("should navigate to the user dashboard", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(5000);
    cy.location("pathname").should("eq", "/frontend/user-dashboard/index.html");
  });
  it("The  navbar should have usersname", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.get(".profile").should("contain", "Bezyl Mophat");
  });
  it("Should have products in the dashboard", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(3000);
    cy.get(".my-shop-products").find(".product").should("have.length.gt", 0);
  });
  it("Should have a search bar", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.get(".search-bar").should("be.visible");
  });
  it("Should have a logout button", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.get(".logout").should("be.visible");
  });
  it("it should navigate to my cart oage when cart is clicked", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.get("#cart").click();
    cy.location("pathname").should(
      "eq",
      "/frontend/user-dashboard/cart/index.html"
    );
  });
  it("should find the cart empty", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.get("#cart").click();
    cy.get(".emptyCart").should("be.visible");
  });
  it("it should navigate to my Orders Page clicked", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.get(".orders").click();
    cy.location("pathname").should(
      "contain",
      "/frontend/user-dashboard/myOrder/index.html"
    );
  });
});
