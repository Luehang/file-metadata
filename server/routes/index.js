const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
import path from 'path';
import Image from './../models/Image';

const storage = multer.diskStorage({
  destination: 'server/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() +
    path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limit: {fileSize: 1000000},
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('upfile');

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(
    path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only.');
  }
}

router.get('/', (req, res) => {
  res.render('layout');
});

router.post('/upload', (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('layout', {
        message: err
      });
    } else {
      if(req.file == undefined) {
        res.render('layout', {
          message: 'Error: No File Selected.'
        });
      } else {
        const size = `${req.file.size} bytes`;
        res.status(200).render('layout', {
          message: 'File Uploaded.',
          size: size
        });

        // const image = new Image({
        //   filename: req.file.filename,
        //   mimetype: req.file.mimetype,
        //   encoding: req.file.encoding,
        //   size: req.file.size,
        //   data: [req.body]
        // });
        // console.log(typeof req.body);
        // return res.end(console.log(image));

        // image.save().then((newImage) => {
        //   res.status(200).render('layout', {
        //     message: 'File Uploaded.',
        //     size: size
        //   });
        // }).catch((error) => {
        //   res.status(500).render('layout', {
        //     message: error
        //   });
        // });
      }
    }

    // console.log('Path of file in parent dir:',
    //  require('path').resolve(__dirname, './../uploads/example.txt'));
    // const stats = fs.statSync(path.resolve(__dirname, './../uploads/example.txt'));
    // console.log(stats)
    // fs.stat(require('path').resolve(__dirname, './../uploads/example.txt'), (err, stats) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(stats);
    //   }
    // })
  });
});

module.exports = router;
