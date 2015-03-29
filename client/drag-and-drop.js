var el = document.getElementById('dropzone')

el.addEventListener("drop", function (event) {

	event.preventDefault()
	event.stopPropagation()


	var file = event.dataTransfer.files[0]

	var data = new FormData()
	data.append('file', file)
	data.append('fileName', file.name)
	data.append('type', file.type)
	
	$.ajax({
		url: '/image',
		data: data,
		processData: false,
		contentType: false, 
		type: 'POST',
		success: function(data){
			console.log('Photo dropped!')
		}
	})
}, false)

el.addEventListener('dragover', function (event) {
	event.stopPropagation()
	event.preventDefault()
	event.dataTransfer.dropEffect = 'copy'
})


