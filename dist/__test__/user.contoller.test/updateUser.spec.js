import updateUser from "../../controllers/user.contollers/updateUser.ts";
import DB from "../../database/dbHelper/index.ts";
import bcrypt from "bcryptjs";
jest.mock("../../database/dbHelper/index.ts");
jest.mock("bcryptjs");
describe("Testing Out Update User Controller", () => {
    it("it should return an error 400 if no id is provided", async () => {
        const mockedReq = {
            params: {},
        };
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await updateUser(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(400);
        expect(mockedRes.json).toHaveBeenCalledWith({
            message: "No id provided",
            status: "failed",
        });
    });
    it("it should return an error 404 if no user is found", async () => {
        const mockedReq = {
            body: {
                name: "test",
                email: "test_email@gmail.com",
            },
            params: {
                id: "1",
            },
        };
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await DB.executeProcedure.mockResolvedValueOnce({
            rowsAffected: [0],
        });
        await updateUser(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(404);
        expect(mockedRes.json).toHaveBeenCalledWith({
            message: "User not found.Therefore not updated",
            status: "failed",
        });
    });
    it("When the update includes a password it should be hashed first", async () => {
        const mockedReq = {
            body: {
                name: "test",
                email: "test_email@gmail.com",
                password: "test_password",
            },
            params: {
                id: "1",
            },
        };
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await bcrypt.genSalt.mockResolvedValueOnce("10");
        await bcrypt.hash.mockResolvedValueOnce("hashed_password");
        await updateUser(mockedReq, mockedRes);
        expect(bcrypt.hash).toHaveBeenCalledWith("test_password", "10");
    });
});
