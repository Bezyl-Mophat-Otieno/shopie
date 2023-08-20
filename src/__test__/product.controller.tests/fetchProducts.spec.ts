import DB from "../../database/dbHelper/index.ts";
import { Request, Response } from "express";
import fetchProducts from "../../controllers/product.controllers/fetchProducts.ts";

jest.mock("../../database/dbHelper/index.ts");
describe("Fetch Producst Tests", () => {
  it("should return 404 if no products found", async () => {
    const mockedReq = {} as Request;

    const mockedRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: [],
    });

    await fetchProducts(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(404);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "No products found",
    });
  });

  it("should return 200 if products are found", async () => {
    const mockedReq = {} as Request;

    const mockedRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const mockedProduct = {
      id: "dsjchj",
      name: "test",
      description: "test",
      price: 10,
      Image: null,
    };

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: [mockedProduct],
    });

    await fetchProducts(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
    expect(mockedRes.json).toHaveBeenCalledWith([mockedProduct]);
  });
});
