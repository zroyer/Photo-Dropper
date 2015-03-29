var fs = require('fs')
var r = require('./db')
var _ = require('lodash')
var multiparty = require('multiparty')

var imageCreate = function (req, res) { 
  var form = new multiparty.Form()
  
  form.parse(req, function (err, fields, files) {
    var imageFilePath = files.file[0].path;
    var image = {
      fileName: fields.fileName[0],
      type: fields.type[0],
    };
    
    fs.readFile(imageFilePath, function (err, file) {
      image.file = r.binary(file)
      r
        .table('images')
        .insert(image)
        .run(r.conn)
        .then(function (query_result) {
          res.json( {
            id: req.params.id
          });
        });
    })
  });
};

module.exports = imageCreate
