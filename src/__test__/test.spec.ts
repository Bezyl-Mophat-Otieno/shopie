import addProduct from "../controllers/product.controllers/addProduct.ts";
import { Request, Response } from "express";

describe("Test 1", () => {
  it("it should errr", async () => {
    const mockedReq = {
      body: {},
    } as Request;

    const mockedRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await addProduct(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Please fill all fields",
    });
  });
});
