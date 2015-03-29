var el = document.getElementById('dropzone')

el.addEventListener("drop", function(event) {

	event.preventDefault()
	event.stopPropagation()

	var file = event.dataTransfer.files[0]
})