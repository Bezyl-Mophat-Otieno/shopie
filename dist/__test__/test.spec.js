import addProduct from "../controllers/product.controllers/addProduct.js";
describe("Test 1", () => {
    it("it should errr", async () => {
        const mockedReq = {
            body: {},
        };
        const mockedRes = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        await addProduct(mockedReq, mockedRes);
    });
});
