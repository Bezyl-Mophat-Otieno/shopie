import DB from "../database/dbHelper/index.js";
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }
        // fetch the user from the database
        const result = await DB.executeProcedure("getUser", { email });
        const user = result.recordset[0];
        if (result.recordset.length === 0) {
            return res.status(400).json({ message: "User does not exist" });
        }
        else {
            console.log(user);
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};
export default loginUser;
