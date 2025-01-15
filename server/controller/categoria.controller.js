const pool = require("../database/index")
const categoriaController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM categorias")
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = categoriaController