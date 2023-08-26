import getLoggedUser from "../../controllers/user.contollers/getLoggedUser.ts";
import jwt from "jsonwebtoken";
jest.mock("jsonwebtoken");
describe("Testing Out Get Logged User Controller", () => {
    it("it should error out if the token is not provided", async () => {
        const mockedReq = {
            headers: {},
        };
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await getLoggedUser(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(400);
        expect(mockedRes.json).toHaveBeenCalledWith({ message: "Token not found" });
    });
    it("it should return the user information if the token is valid", async () => {
        const mockedReq = {
            headers: {
                token: "test_token",
            },
        };
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mockedUser = {
            username: "test",
            email: "test_email",
            password: "test_password",
            deleted: false,
        };
        jwt.verify.mockReturnValueOnce(mockedUser);
        await getLoggedUser(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(200);
        expect(mockedRes.json).toHaveBeenCalledWith({
            message: "User fetched successfully",
            user: mockedUser,
        });
    });
});
