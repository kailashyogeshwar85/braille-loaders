var Braille = require('../index');

var loader = new Braille({
	spinner: 'circleHalves',
	color: 'red',
	text: 'loading'
});

loader.start();


setTimeout(function(){
	console.log("stopping");
	loader.destroy();
},5000)