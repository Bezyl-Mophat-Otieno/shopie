import DB from "../../database/dbHelper/index.ts";
import getProduct from "../../controllers/product.controllers/getProduct.ts";
jest.mock(`../../database/dbHelper/index.ts`);
describe("Fetch Product Tests", () => {
    it("should return 400 if id is not provided", async () => {
        const mockedReq = {
            params: {},
        };
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await getProduct(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(400);
        expect(mockedRes.json).toHaveBeenCalledWith({
            message: "Id is required",
        });
    });
    it("should return 404 if no product found", async () => {
        const mockedReq = {
            params: {
                id: "1",
            },
        };
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await DB.executeProcedure.mockResolvedValueOnce({
            recordset: [],
        });
        await getProduct(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(404);
        expect(mockedRes.json).toHaveBeenCalledWith({
            message: "Product not found",
        });
    });
    it("should return 200 if product found", async () => {
        const mockedReq = {
            params: {
                id: "1",
            },
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mockedProduct = {
            id: 1,
            name: "test",
            description: "test",
            price: 100,
            image: null,
        };
        await DB.executeProcedure.mockResolvedValueOnce({
            recordset: [mockedProduct],
        });
        await getProduct(mockedReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockedProduct);
    });
});
