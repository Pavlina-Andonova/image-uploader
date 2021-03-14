const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const helpers = require('../helpers');
const dbConfig = require('../dbConfig');


var storage = new GridFsStorage({
  url: `mongodb+srv://Pavlina:${dbConfig.PASSWORD}@cluster0.bjujc.mongodb.net/${dbConfig.DB}?retryWrites=true&w=majority`,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    // const match = ["image/png", "image/jpeg"];

    // console.log('file.mimetype', file.mimetype);
  
    // if (match.indexOf(file.mimetype) !== -1) {
    //   const filename = `${Date.now()}-cv-${file.originalname}`;
    //   return filename;
    // }

    // return {
    //   bucketName: "photos",
    //   filename: `${Date.now()}-cv-${file.originalname}`
    // };
  }
});

// var uploadFiles = multer({ storage: storage }).array("multi-files", 10);
var uploadFiles = multer({ storage: storage, fileFilter: helpers.imageFilter  }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
