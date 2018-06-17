function letterClicked(value) {	
	var r = "#"+value;
	$(r).prop("disabled", true);
	console.log('Clicked: '+ value);	
}