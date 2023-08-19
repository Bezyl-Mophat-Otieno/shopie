import DB from "../../database/dbHelper/index.js";
const fetchProducts = async (req, res) => {
    try {
        const result = await DB.executeProcedure("fetchProducts");
        const products = result.recordset;
        if (result.recordset.length === 0)
            return res.status(404).json({ message: "No products found" });
        return res.status(200).json(products);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, status: "failed" });
    }
};
export default fetchProducts;
