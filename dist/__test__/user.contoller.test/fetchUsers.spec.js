import fetchUsers from "../../controllers/user.contollers/fetchUsers.ts";
import DB from "../../database/dbHelper/index.ts";
jest.mock("../../database/dbHelper/index.ts");
describe(" Testing Out Fetch Users Controller", () => {
    it("it should return 404 if no users are found", async () => {
        const mockedReq = {
            body: {},
        };
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await DB.executeProcedure.mockResolvedValueOnce({
            recordset: [],
        });
        await fetchUsers(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(404);
        expect(mockedRes.json).toHaveBeenCalledWith({
            message: "Users Not Found",
            status: "failed",
        });
    });
    it("it should return 200 if users are found", async () => {
        const mockedReq = {
            body: {},
        };
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mockedUsers = [
            {
                id: 1,
                name: "John Doe",
                email: "john @gmail.com",
                password: "password",
                image: "image_url",
            },
            {
                id: 1,
                name: "John Doe",
                email: "john @gmail.com",
                password: "password",
                image: "image_url",
            },
        ];
        await DB.executeProcedure.mockResolvedValueOnce({
            recordset: mockedUsers,
        });
        await fetchUsers(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(200);
        expect(mockedRes.json).toHaveBeenCalledWith({
            users: mockedUsers,
            status: "success",
        });
    });
});
