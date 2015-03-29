'use strict';
var r = require('./db')

var socketHandler = function (io, socket) {

  r.getNewConnection()
    .then(function (conn) {
      r
        .table('images')
        .changes()
        .run(conn)
        .then(function (cursor) {
          cursor.each(function (err, photo) {
            if (photo.new_val !== null) {
              io.emit('Image:update', photo.new_val);
            }
          });
        });
     });
};

module.exports = socketHandler