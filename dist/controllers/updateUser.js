import DB from "../database/dbHelper/index.js";
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ message: "Id is required" });
        const result = await DB.executeProcedure("updateUser", { ...req.body, id });
        if (result.rowsAffected[0] === 0)
            return res
                .status(400)
                .json({
                message: "User not found.Therefore not updated",
                status: "failed",
            });
        return res
            .status(200)
            .json({ message: "User updated successfully", status: "success" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
export default updateUser;
