const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const customer = require('./controller/customer');
const item = require('./controller/item');
const sales = require('./controller/sales')

const app = express();
const public = __dirname + "/public/";
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use('/public/uploads', express.static(path.join(public, "uploads")));


app.use(customer);
app.use(item);
app.use(sales);
app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`))