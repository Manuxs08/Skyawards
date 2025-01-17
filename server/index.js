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

app.get('/get/nominados', (req, res) => {
    const sql = "SELECT * FROM nominados";
    db.query(sql, (err, result) => {
        if(err){return res.json(err)};
        return res.json(result);
    })
})

app.get('/get/nominados/count', (req, res) => {
    const sql = "SELECT COUNT(*) as nominaciones FROM `nominadoscategoria` WHERE `idNominado1` = ? OR `idNominado2` = ?;";
    const idNom1 = req.query.idNom1;
    const idNom2 = req.query.idNom2;
    db.query(sql, [idNom1, idNom2],(err, result) => {
        if(err){return res.json(err)};
        return res.json(result);
    })
})

app.get('/get/categorias', async (req, res) => {
    try {
        const [results, fields] = await db.query(
            "SELECT * FROM categorias"
        )
        console.log(results);
        console.log(fields);
    } catch (error) {
        console.log(error)
    }
})

app.get('/get/categoria/nominados', (req, res) => {
    const sql = "SELECT * FROM `nominadoscategoria`";
    db.query(sql, (err, result) => {
        if(err){return res.json(err)};
        return res.json(result);
    })
})

app.get('/get/categorias/nominados/idCat', (req, res) => {
    const sql = "SELECT * FROM `nominadoscategoria` WHERE idCategoria = ?";
    const idCategoria = req.query.idCategoria;
    db.query(sql, idCategoria, (err, result) => {
        if(err){return res.json(err)};
        return res.json(result);
    })
})

app.get('/get/categoria/nominados/count', (req, res) => {
    const sql = "SELECT COUNT(*) as votes FROM `votos` WHERE `idNomCategoria` = ?";
    const id = req.query.id;
    db.query(sql, id, (err, result) => {
        if(err){return res.json(err)};
        return res.json(result);
    })
})

app.get('/get/usuario/:idVotante', (req, res) => {
    const sql = "SELECT * FROM `usuarios` WHERE `id` = ?";
    const id = req.params.idVotante
    db.query(sql, id, (err, result) => {
        if(err){return res.json(err)};
        return res.json(result);
    })
})

app.post('/post/usuario', (req, res) => {
    const sql = "INSERT INTO `usuarios`(`id`, `email`, `icon`) VALUES (?)";
    const values = [
        req.body.id,
        req.body.email,
        req.body.icon
    ]
    db.query(sql, [values], (err, result) => {
        if(err){return res.json(err)};
        return res.json(result);
    })
})

app.get('/get/votos', (req, res) => {
    const sql = "SELECT * FROM `votos` WHERE `idVotante` = ?";
    const id = req.query.id;
    db.query(sql, id, (err, result) => {
        if(err){return res.json(err)};
        return res.json(result);
    })
})

app.get('/get/voto', (req, res) => {
    const sql = "SELECT * FROM `votos` WHERE `idVotante` = ? AND `idCategoria` = ?";
    const idVotante = req.query.idVotante;
    const idCategoria = req.query.idCategoria;
    db.query(sql, [idVotante, idCategoria], (err, result) => {
        if(err){return res.json(err)};
        return res.json(result);
    })
})

app.post('/post/voto', (req, res) => {
    const sql = "INSERT INTO `votos`(`idVotante`, `idCategoria`, `idNominado1`, `idNominado2`, `idNomCategoria`) VALUES (?)";
    const values = [
        req.body.idVotante,
        req.body.idCategoria,
        req.body.idNominado1,
        req.body.idNominado2,
        req.body.idNomCategoria
    ]
    db.query(sql, [values], (err, result) => {
        if(err){return res.json(err)};
        return res.json(result);
    })
})

app.put('/put/voto', (req, res) => {
    const sql = "UPDATE `votos` SET `idNominado1`= ?,`idNominado2`= ?, `idNomCategoria`= ? WHERE `idVotante` = ? AND `idCategoria` = ?";
    const values = [
        req.body.idNominado1,
        req.body.idNominado2,
        req.body.idNomCategoria,
        req.body.idVotante,
        req.body.idCategoria
    ]
    db.query(sql, values, (err, result) => {
        if(err){return res.json(err)};
        return res.json(result);
    })
})


app.listen(PORT, (err) => {
    if(err) console.log(err)
    console.log("SERVER LISTENING ON PORT",PORT)
})