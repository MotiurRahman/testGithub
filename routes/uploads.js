var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var move = require('mv');
var upload = multer({
  dest: '/tmp'
})


router.post('/uploads', upload.array('images'), function(req, res) {
  var files = req.files;
  console.log(files);
  files.forEach(function(file) {
    var source = file.path;
    var dest = './uploads';
    var fileName = file.originalname;
    move(source, dest + '/' + fileName, function(err) {
      if (err) {
        throw err;
      }
      console.log(fileName + ' is uploaded successfully');
    });
  });
  res.status(204).end('uploaded successfully');
});


module.exports = router;