const { path } = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __dirname + '/../public/uploads');
    },
    filename: (req, file, callback) => {
        callback(null,Date.now()+`.${file.originalname.split(".")[file.originalname.split('.').length-1]}`)
    },
})
const upload = multer({ storage: storage });
module.exports = upload;