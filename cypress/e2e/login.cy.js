describe("Login", () => {
  it("Should navigate to the login page", () => {
    cy.visit(
      "http://127.0.0.1:5500/frontend/authentication-page/login/index.html"
    );
  });
  it("should login", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
  });
  // The alert should be visible
  it("should display alert", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(2000);
    cy.get(".alert").should("be.visible");
  });
  it("The alert should disapear after 3seconds", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.wait(3000);
    cy.get(".alert").should("not.exist");
  });
  it("should navigate either to the or users dashboard", () => {
    cy.login("bezylmophatotieno@gmail.com", "12345");
    cy.location("pathname").should("eq", "/frontend/user-dashboard/index.html");
  });

  it("should navigate either to the or admins dashboard", () => {
    cy.login("admin@gmail.com", "12345");
    cy.location("pathname").should(
      "eq",
      "/frontend/admin-dashboard/index.html"
    );
  });
});
