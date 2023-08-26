import DB from "../../database/dbHelper/index.ts";
import fetchProducts from "../../controllers/product.controllers/fetchProducts.ts";
jest.mock("../../database/dbHelper/index.ts");
describe("Fetch Producst Tests", () => {
    it("should return 404 if no products found", async () => {
        const mockedReq = {};
        const mockedRes = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        await DB.executeProcedure.mockResolvedValueOnce({
            recordset: [],
        });
        await fetchProducts(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(404);
        expect(mockedRes.json).toHaveBeenCalledWith({
            message: "No products found",
        });
    });
    it("should return 200 if products are found", async () => {
        const mockedReq = {};
        const mockedRes = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        const mockedProducts = [
            {
                id: "1",
                name: "test",
                description: "test",
                price: 10,
                Image: null,
            },
            {
                id: "2",
                name: "test2",
                description: "test2",
                price: 11,
                Image: null,
            },
        ];
        await DB.executeProcedure.mockResolvedValueOnce({
            recordset: mockedProducts,
        });
        await fetchProducts(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(200);
        expect(mockedRes.json).toHaveBeenCalledWith({
            products: mockedProducts,
            status: "success",
        });
    });
});
