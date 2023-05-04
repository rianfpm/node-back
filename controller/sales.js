const express = require('express');
const router = express.Router();
const { Customer, Sales, SalesItem, Item } = require('../models');

router.post('/sales', async (req, res) => {
    try {
        const { customer_id, items } = req.body;

        let total_harga = 0;
        let total_diskon = 0;

        for (const item of items) {
            const ItemIn = await Item.findOne({ where: { item_id: item.item_id } });
            if (item.quantity > ItemIn.stok) {
                return res.status(400).json({
                    message: `Item ${ItemIn.name} is out of stock!`,
                });
            }

            total_harga = total_harga + (ItemIn.harga_satuan * item.quantity);

            await Item.update({
                stok: ItemIn.stok - item.quantity
            }, {
                where: {
                    item_id: item.item_id
                }
            });
        }

        await Customer.findOne({ where: { customer_id } }).then(response => {
            if (response.tipe_diskon === "persentase") {
                total_diskon = total_harga * (response.diskon / 100);
            } else {
                total_diskon = response.diskon
            }
        });

        const total_bayar = total_harga - total_diskon;

        const kode_transaksi = "SLS-" + Date.now();

        const sales = await Sales.create({
            kode_transaksi, customer_id, total_diskon, total_bayar, total_harga, tanggal_transaksi: Date.now()
        })

        items.forEach(async item => {
            await SalesItem.create({ item_id: item.item_id, quantity: item.quantity, sales_id: sales.sales_id })
        });

        const data = await Sales.findOne({
            where: { sales_id: sales.sales_id },
            include: {
                model: SalesItem,
                attributes: ['item_id', 'quantity'],
                include: {
                    model: Item,
                    attributes: ['name', 'barang']
                }
            }
        })

        return res.status(200).json({
            message: 'Sales berhasil dibuat!',
            data
        })

    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Gagal Menambah Data',
        });
    }
})

router.get('/sales', async (req, res) => {
    try {
        const data = await Sales.findAll({
            include: [{
                model: SalesItem,
                attributes: ['item_id', 'quantity'],
                include: {
                    model: Item,
                    attributes: ['name', 'barang']
                }
            }, {
                model: Customer
            }]
        })

        return res.status(200).json({
            data
        })

    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Gagal Mendapatkan Data',
        });
    }
})

router.delete('/sales/:sales_id', async (req, res) => {
    try {
        const { sales_id } = req.params;

        const deleteCount = await Sales.destroy({
            where: { sales_id }
        });

        if (deleteCount < 1) {
            return res.status(401).json({
                message: 'The Sales was not properly deleted.',
            });
        }

        return res.status(200).json({
            message: 'Sales has been deleted'
        })
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            message: 'Failed to delete sales',
        });
    }
})


module.exports = router;