describe("Testing the Admins Dashboard Page", () => {
  it("It should navigate to admins dashobaord", () => {
    cy.login("admin@gmail.com", "12345");
  });
  it("The  navbar should have usersname", () => {
    cy.login("admin@gmail.com", "12345");
    cy.wait(3000);
    cy.get(".profile").should("contain", "administrator");
  });
  it("Should have a logout button", () => {
    cy.login("admin@gmail.com", "12345");
    cy.get(".logout").should("be.visible");
  });
  it("Should have products", () => {
    cy.login("admin@gmail.com", "12345");
    cy.wait(2000);
    cy.get(".product-container").find(".product").should("have.length.gt", 0);
  });
  it("For each product we should have a delete button", () => {
    cy.login("admin@gmail.com", "12345");
    cy.wait(4000);
    cy.get(".product-container .product:first-child .action-btn-delete").should(
      "exist"
    );
  });
  it("It should make sure we have the update button", () => {
    cy.login("admin@gmail.com", "12345");
    cy.wait(4000);
    cy.get(".product-container .product:first-child .action-btn-update").should(
      "be.visible"
    );
  });
  it("It should delete the product successfully and it should not exist", () => {
    cy.login("admin@gmail.com", "12345");
    cy.wait(4000);
    cy.get(
      ".product-container .product:first-child .action-btn-delete"
    ).click();
    cy.wait(4000);
    cy.get(".product-container .product:first-child").should("not.exist");
  });

  // STILL HAVE ISSUES WITH THIS TEST CASE

  it("On delete the products should reduce in number", () => {
    cy.login("admin@gmail.com", "12345");
    cy.wait(4000);
    cy.get(".product-container .product").its("length").as("initialLength");
    cy.get(
      ".product-container .product:first-child .action-btn-delete"
    ).click();
    cy.wait(7000);
    cy.get("@initialLength").then((initialLength) => {
      cy.get(".product-container .product").should(
        "have.length",
        initialLength - 1
      );
    });
  });
  it("should populate the product form when update button is clicked", () => {
    cy.login("admin@gmail.com", "12345");
    cy.wait(4000);
    cy.get(
      ".product-container .product:first-child .action-btn-update"
    ).click();
    cy.wait(4000);
    cy.get(".productName").should("not.have.value", "");
    cy.get(".productPrice").should("not.have.value", "");
    cy.get(".productDesc").should("not.have.value", "");
    cy.get(".quantity").should("not.have.value", "");
    cy.get(".add-btn").should("contain", "Update Product");
  });
  it("Should show an alert that will disappear after 3seconds", () => {
    cy.login("admin@gmail.com", "12345");
    cy.wait(4000);
    cy.get(
      ".product-container .product:first-child .action-btn-update"
    ).click();
    cy.wait(4000);
    cy.get(".form-container").find(".add-btn").click();
    cy.wait(4000);
    cy.get(".alert").should("be.visible");
    cy.wait(4000);
    cy.get(".alert").should("not.exist");
  });
  it("it should make sure the image selector can be clickable", () => {
    cy.login("admin@gmail.com", "12345");
    const image = "frontend/assets/images/Black.png";
    cy.wait(4000);

    cy.get("#image").selectFile(image);
  });
  it("It should clear the form when the update button is clicked", () => {
    cy.login("admin@gmail.com", "12345");
    cy.wait(4000);
    cy.get(
      ".product-container .product:first-child .action-btn-update"
    ).click();
    cy.wait(4000);
    cy.get(".form-container").find(".add-btn").click();
    cy.wait(4000);
    cy.get(".productName").should("have.value", "");
    cy.get(".productPrice").should("have.value", "");
    cy.get(".productDesc").should("have.value", "");
    cy.get(".quantity").should("have.value", "");
    cy.get(".add-btn").should("contain", "Add Product");
  });
  it("should take you to the customers page when customer button is clicked", () => {
    cy.login("admin@gmail.com", "12345");
    cy.wait(4000);
    cy.get(".customers").click();
    cy.location("pathname").should(
      "contain",
      "/frontend/admin-dashboard/customers-order-page/index.html"
    );
  });
  it("Should have customer list table with customers and the deactivate button", () => {
    cy.login("admin@gmail.com", "12345");
    cy.wait(4000);
    cy.get(".customers").click();
    cy.wait(4000);
    cy.get(".customer-list").should("be.visible");
    cy.get(".customer-list").find(".deactivate-btn");
  });

  it("Should deactivate the customer when the deactivate button is clicked", () => {
    cy.login("admin@gmail.com", "12345");
    cy.wait(4000);
    cy.get(".customers").click();
    cy.wait(4000);
    cy.get(".customer-list").should("be.visible");
    cy.get(".customer-list ").find(".deactivate-btn").first().click();
    cy.wait(4000);
    cy.get(".alert").should("exist");
  });
  it("should navigate to orders page when orders button is clicked", () => {
    cy.login("admin@gmail.com", "12345");
    cy.wait(4000);
    cy.get(".orders").click();
    cy.wait(2000);
    cy.location("pathname").should(
      "contain",
      "/frontend/admin-dashboard/orders-page/index.html"
    );
  });
  it("Should have a table with orders and the button to view an order", () => {
    cy.login("admin@gmail.com", "12345");
    cy.wait(4000);
    cy.get(".orders").click();
    cy.wait(2000);
    cy.get(".orders").should("be.visible");
    cy.get(".view-button").should("be.visible");
  });
  it("it should take you to the single order page when the view button is clicked", () => {
    cy.login("admin@gmail.com", "12345");
    cy.wait(4000);
    cy.get(".orders").click();
    cy.wait(2000);
    cy.get(".view-button").first().click();
    cy.location("pathname").should(
      "contain",
      "/frontend/admin-dashboard/singleOrder/index.html"
    );
  });
  it("should have a profile section with the customers name", () => {
    cy.login("admin@gmail.com", "12345");
    cy.wait(4000);
    cy.get(".orders").click();
    cy.wait(2000);
    cy.get(".view-button").first().click();
    cy.location("pathname").should(
      "contain",
      "/frontend/admin-dashboard/singleOrder/index.html"
    );

    cy.get(".profile").should("not.be.empty");
  });
});
