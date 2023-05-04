const fs = require('fs');
const path = require('path');

const decodeBase64Image = dataString => {
    const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');

    return response;
}

const Uploads = async (data, directory = 'images') => {
    const decData = decodeBase64Image(data);

    const fileName = directory + '-' + Date.now() + '.' + decData.type.split('/')[1];
    const filePath = 'public/uploads/' + directory + '/' + fileName;

    fs.writeFile(filePath, decData.data, (error) => {
        if (error) {
            return next(error);
        }
    });

    return filePath;
}

module.exports = { Uploads };