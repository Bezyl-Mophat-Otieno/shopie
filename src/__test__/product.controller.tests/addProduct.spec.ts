import addProduct from "../../controllers/product.controllers/addProduct.ts";
import { Request, Response } from "express";
import DB from "../../database/dbHelper/index.ts";

jest.mock("../../database/dbHelper/index.ts");
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

  it("should error out with a message when a product is not created successfully", async () => {
    const mockedReq = {
      body: {
        name: "test",
        description: "test",
        price: 100,
      },
    } as Request;

    const mockedRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    ((await DB.executeProcedure) as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [0],
    });

    await addProduct(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Something went wrong,The Product was not added",
      status: "failed",
    });
  });

  it("should return a success message when a product is created successfully", async () => {
    const mockedReq = {
      body: {
        name: "test",
        description: "test",
        price: 100,
      },
    } as Request;

    const mockedRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    ((await DB.executeProcedure) as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [1],
    });

    await addProduct(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Product added successfully",
      status: "success",
    });
  });
});
