const express = require('express');
const router = express.Router();
const { Item } = require('../models');

router.get('/item', async (req, res) => {
    try {
        const data = await Item.findAll();

        res.status(200).json(data);
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Gagal Mendapatkan Data',
        });
    }
});

router.post('/item', async (req, res) => {
    try {
        let { name, unit, stok, harga_satuan, barang } = req.body;

        barang = req.protocol + '://' + req.get('host') + '/' + await Uploads(barang);

        await Item.create({
            name, unit, stok, harga_satuan, barang
        });
        return res.status(200).json({
            message: "Data Berhasil ditambah"
        })
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Gagal Menambahkan Data',
        });
    }
});

router.put('/item', async (req, res) => {
    try {
        const { item_id, name, unit, stok, harga_satuan, barang } = req.body;
        var countUpdate = 0

        if (barang.update) {
            const image = req.protocol + '://' + req.get('host') + '/' + await Uploads(barang.image, 'images');

            countUpdate = await Item.update(
                { name, unit, stok, harga_satuan, barang: image },
                { where: { item_id } });
        } else {
            countUpdate = await Item.update(
                { name, unit, stok, harga_satuan },
                { where: { item_id } });
        }

        if (countUpdate < 1) {
            return res.status(401).json({
                message: 'Item not update'
            });
        };
        return res.status(200).json({
            message: "Data Berhasil Diubah"
        });
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Gagal Mengubah data',
        });
    }
});

router.delete('/item/:item_id', async (req, res) => {
    try {
        const { item_id } = req.params;
        await Item.destroy({
            where: {
                item_id
            }
        });
        return res.status(200).json({
            message: "Data berhasil dihapus"
        });
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Gagal Menghapus data',
        });
    }
});

module.exports = router;