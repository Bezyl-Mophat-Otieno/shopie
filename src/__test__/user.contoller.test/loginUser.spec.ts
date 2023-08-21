import jwt from "jsonwebtoken";
import loginUser from "../../controllers/user.contollers/loginUser.ts";
import DB from "../../database/dbHelper/index.ts";
import { Response, Request } from "express";
import bcrypt from "bcryptjs";

jest.mock("../../database/dbHelper/index.ts");
jest.mock("jsonwebtoken");
jest.mock("bcryptjs");
describe("Testing Out Login User Controller", () => {
  it("it should error out if any of the fields are empty", async () => {
    const mockedReq = {
      body: {},
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await loginUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Please enter all fields",
    });
  });
  it("it should error out if the user does not exist", async () => {
    const mockedReq = {
      body: {
        email: "test@gmail.com",
        password: "test_password",
      },
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: [],
    });
    await loginUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(404);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "User does not exist",
    });
  });
  it("it should error out if the user is deleted", async () => {
    const mockedReq = {
      body: {
        email: "test@gmail.com",
        password: "test_password",
      },
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const mockedUser = {
      username: "test",
      email: "test@gmail.com",
      password: "test_password",
      deleted: true,
    };

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: [mockedUser],
    });
    await loginUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Your account is deactivated",
    });
  });

  it("it should error out if the password is incorrect", async () => {
    const mockedReq = {
      body: {
        email: "test@gmail.com",
        password: "wrong_password",
      },
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const mockedUser = {
      username: "test",
      email: "test@gmail.com",
      password: "test_password",
      deleted: false,
    };

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: [mockedUser],
    });

    ((await bcrypt.compare) as jest.Mock).mockResolvedValueOnce(false);
    await loginUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Invalid credentials",
      status: "failed",
    });
  });

  it("it should return a token if the password is correct", async () => {
    const mockedReq = {
      body: {
        email: "test@gmail.com",
        password: "test_password",
      },
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const mockedUser = {
      username: "test",
      email: "test@gmail.com",
      password: "test_password",
      deleted: false,
    };

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: [mockedUser],
    });

    ((await bcrypt.compare) as jest.Mock).mockResolvedValueOnce(true);

    (jwt.sign as jest.Mock).mockReturnValueOnce("token_value");
    await loginUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Login successful",
      token: "token_value",
      status: "success",
    });
  });
});
