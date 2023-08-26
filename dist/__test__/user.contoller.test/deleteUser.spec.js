import deleteUser from "../../controllers/user.contollers/deleteUser.ts";
import DB from "../../database/dbHelper/index.ts";
jest.mock("../../database/dbHelper/index.ts");
describe("Testing Out Delete User Controller", () => {
    it("it should return an error 400 if no id is provided", async () => {
        const mockedReq = {
            params: {},
        };
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await deleteUser(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(400);
        expect(mockedRes.json).toHaveBeenCalledWith({
            message: "No id provided",
            status: "failed",
        });
    });
    it("it should return an error 404 if no user is found", async () => {
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
            rowsAffected: [0],
        });
        await deleteUser(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(404);
        expect(mockedRes.json).toHaveBeenCalledWith({
            message: "User not found",
            status: "failed",
        });
    });
    it("it should return a 200 if user is deleted successfully", async () => {
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
            rowsAffected: [1],
        });
        await deleteUser(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(200);
        expect(mockedRes.json).toHaveBeenCalledWith({
            message: "User deleted successfully",
            status: "success",
        });
    });
});
