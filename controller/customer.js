const express = require('express');
const router = express.Router();
const { Customer } = require('../models');
const { Uploads } = require('./upload');

router.get('/customer', async (req, res) => {
    try {
        const data = await Customer.findAll();

        res.status(200).json(data);
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Gagal Mendapatkan Data',
        });
    }
});

router.post('/customer', async (req, res) => {
    try {
        let { name, contact, email, alamat, diskon, tipe_diskon, ktp } = req.body;
        // console.log(name, contact, email, alamat, diskon, tipe_diskon, ktp);
        ktp = req.protocol + '://' + req.get('host') + '/' + await Uploads(ktp);

        await Customer.create({
            name, contact, email, alamat, diskon, tipe_diskon, ktp
        });
        return res.status(200).json({
            message: "Data berhasil ditambah"
        });
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Gagal Menambahkan Data',
        });
    }
});

router.put('/customer', async (req, res) => {
    try {
        const { customer_id, name, contact, email, alamat, diskon, tipe_diskon, ktp } = req.body;
        let countUpdate = 0

        if (ktp.update) {
            const image = req.protocol + '://' + req.get('host') + '/' + await Uploads(ktp.image, 'images');

            countUpdate = await Customer.update(
                { name, contact, email, alamat, diskon, tipe_diskon, ktp: image },
                { where: { customer_id } }
            );
        } else {
            countUpdate = await Customer.update(
                { name, contact, email, alamat, diskon, tipe_diskon, },
                { where: { customer_id } }
            );
        }

        if (countUpdate < 1) {
            return res.status(401).json({
                message: 'Customer not update'
            });
        };

        return res.status(200).json({
            message: "Data Berhasil Diubah"
        });
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Gagal Mengubah Data',
        });
    }
});

router.delete('/customer/:customer_id', async (req, res) => {
    try {
        const { customer_id } = req.params;
        const deleteData = await Customer.destroy({
            where: {
                customer_id
            }
        });
        if (deleteData != 1) {
            return res.status(400).json({
                message: "data tidak terhapus"
            });
        };
        return res.status(200).json({
            message: 'Data berhasil dihapus'
        });
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Gagal Mengubah Data',
        });
    }
});

router.get('/customer/:customer_id', async (req, res) => {
    try {
        const { customer_id } = req.params;
        const detailData = await Customer.findOne({
            where: {
                customer_id
            }
        });
        return res.status(200).json(detailData);
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Gagal mengambil Data',
        });
    }
});

module.exports = router;