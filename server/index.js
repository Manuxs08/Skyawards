require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
    origin: 'https://skyawards-client.vercel.app',
    credentials: true
}
));

const PORT = process.env.PORTDB || 3306

const db = require('./config')

app.get('/get/nominados', async (req, res) => {
    try {
        const [results, fields] = await db.query(
            "SELECT * FROM nominados"
        );
        if(results.length > 0){
            return res.status(200).json(results)
        }else{
            res.status(401).send("Consulta fallida")
        }
    } catch (error) {
        console.log(error)
    }
    const sql = "SELECT * FROM nominados";
    db.query(sql, (err, result) => {
        if(err){return res.json(err)};
        return res.json(result);
    })
})

app.get('/get/nominados/count', async (req, res) => {
    const data = req.query;
    try {
        const [results, fields] = await db.query(
            "SELECT COUNT(*) as nominaciones FROM `nominadoscategoria` WHERE `idNominado1` = ? OR `idNominado2` = ?",
            [data.idNom1, data.idNom2]
        );
        if(results.length > 0){
            return res.status(200).json(results)
        }else{
            res.status(401).send("Consulta fallida")
        }
    } catch (error) {
        console.log(error)
    }
})

app.get('/get/categorias', async (req, res) => {
    try {
        const [results, fields] = await db.query(
            "SELECT * FROM categorias"
        );
        if(results.length > 0){
            return res.status(200).json(results)
        }else{
            res.status(401).send("Consulta fallida")
        }
    } catch (error) {
        console.log(error)
    }
})

app.get('/get/categoria/nominados', async (req, res) => {
    try {
        const [results, fields] = await db.query(
            "SELECT * FROM `nominadoscategoria`"
        );
        if(results.length > 0){
            return res.status(200).json(results)
        }else{
            res.status(401).send("Consulta fallida")
        }
    } catch (error) {
        console.log(error)
    }
})

app.get('/get/categorias/nominados/idCat', async (req, res) => {
    const idCategoria = req.query.idCategoria;
    try {
        const [results, fields] = await db.query(
            "SELECT * FROM `nominadoscategoria` WHERE idCategoria = ?",
            [idCategoria]
        );
        if(results.length > 0){
            return res.status(200).json(results)
        }else{
            res.status(401).send("Consulta fallida")
        }
    } catch (error) {
        console.log(error)
    }
})

app.get('/get/categoria/nominados/count', async (req, res) => {
    const id = req.query.id;
    try {
        const [results, fields] = await db.query(
            "SELECT COUNT(*) as votes FROM `votos` WHERE `idNomCategoria` = ?",
            [id]
        );
        if(results.length > 0){
            return res.status(200).json(results)
        }else{
            res.status(401).send("Consulta fallida")
        }
    } catch (error) {
        console.log(error)
    }
})

app.get('/get/usuario', async (req, res) => {
    const id = req.query.idVotante
    try {
        const [results, fields] = await db.query(
            "SELECT * FROM `usuarios` WHERE `id` = ?",
            [id]
        );
        if(results.length > 0){
            return res.status(200).json(results)
        }else{
            res.status(401).send("Consulta fallida")
        }
    } catch (error) {
        console.log(error)
    }
})

app.post('/post/usuario', async (req, res) => {
    const data = [
        req.body.id,
        req.body.email,
        req.body.icon
    ]
    try {
        await db.query(
            "INSERT INTO `usuarios`(`id`, `email`, `icon`) VALUES (?)",
            [data],
            (err, result) => {
                if(err){
                    return res.status(500).json({message: "Consulta fallida"})
                }
                res.status(201).json({message: "Datos insertados exitosamente"})
            });
    } catch (error) {   
        console.log(error);
    }
})

app.get('/get/votos', async (req, res) => {
    const id = req.query.id;
    try {
        const [results, fields] = await db.query(
            "SELECT * FROM `votos` WHERE `idVotante` = ?",
            [id]
        );
        if(results.length > 0){
            return res.status(200).json(results)
        }else{
            res.status(401).send("Consulta fallida")
        }
    } catch (error) {
        console.log(error)
    }
})

app.get('/get/voto', async (req, res) => {
    const data = req.query;
    try {
        const [results, fields] = await db.query(
            "SELECT * FROM `votos` WHERE `idVotante` = ? AND `idCategoria` = ?",
            [data.idVotante, data.idCategoria]
        );
        if(results.length > 0){
            return res.status(200).json(results)
        }else{
            res.status(401).send("Consulta fallida")
        }
    } catch (error) {
        console.log(error)
    }
})

app.post('/post/voto', async (req, res) => {
    const data = [
        req.body.idVotante,
        req.body.idCategoria,
        req.body.idNominado1,
        req.body.idNominado2,
        req.body.idNomCategoria
    ]
    try {
        await db.query(
            "INSERT INTO `votos`(`idVotante`, `idCategoria`, `idNominado1`, `idNominado2`, `idNomCategoria`) VALUES (?)",
            [data],
            (err, result) => {
                if(err){
                    return res.status(500).json({message: "Consulta fallida"})
                }
                res.status(201).json({message: "Datos insertados exitosamente"})
            });
    } catch (error) {   
        console.log(error);
    }
})

app.put('/put/voto', async (req, res) => {
    const data = [
        req.body.idNominado1,
        req.body.idNominado2,
        req.body.idNomCategoria,
        req.body.idVotante,
        req.body.idCategoria
    ]
    try {
        await db.query(
            "UPDATE `votos` SET `idNominado1`= ?,`idNominado2`= ?, `idNomCategoria`= ? WHERE `idVotante` = ? AND `idCategoria` = ?",
            data,
            (err, result) => {
                if(err){
                    return res.status(500).json({message: "Consulta fallida"})
                }
                res.status(200).json({message: "Datos insertados exitosamente"})
            });
    } catch (error) {   
        console.log(error);
    }
})


app.listen(PORT, (err) => {
    if(err) console.log(err)
    console.log("SERVER LISTENING ON PORT",PORT)
})