describe("Register", () => {
  it("Should Navigate to the register page", () => {
    cy.visit(
      "http://127.0.0.1:5500/frontend/authentication-page/register/index.html"
    );
  });
  it("It should register a user", () => {
    cy.register("John", "john@gmail.com", "12345", "12345");
  });
  it("An alert should be visible", () => {
    cy.register("John", "joh@gmail.com", "12345", "12345");
    cy.wait(2000);
    cy.get(".alert").should("be.visible");
  });
  it("The alert should disappear after 3 seconds", () => {
    cy.register("John", "jo@gmail.com", "12345", "12345");
    cy.wait(4000);
    cy.get(".alert").should("not.exist");
  });
  it("it should navigate to the login page", () => {
    cy.register("John", "j@gmail.com", "12345", "12345");
    cy.location("pathname").should(
      "eq",
      "/frontend/authentication-page/login/index.html"
    );
  });
  it('should')
});
