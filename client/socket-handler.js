var socket = io.connect('http://localhost:3000')

socket.on('Image:update', function (image) {
  var reader = new FileReader()
  reader.onload = function(e) {
    $('#images')
      .html('<img src="' + e.target.result + '" />')
  }.bind(this);
  reader.readAsDataURL(new Blob([image.file]))
});



