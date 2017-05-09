'use strict';

var BrailleLoader = require('../'); 
var spinner  = null;
var timeout  = 2000;
var index    =  0;
var colors   = ['red','green','blue','purple','yellow','cyan','white']; 
var spinners = Object.keys(BrailleLoader.spinners);
var total    = 64;

function execute(_timeout){
	_timeout = _timeout || timeout;
	
	setTimeout(function (){
		if(spinner !== null){
			spinner.stop();
		}
		spinner = new BrailleLoader({
			spinner: spinners[index],
			color: colors[ Math.floor(Math.random() * colors.length)],
			text: ' Loading' 
		});
		spinner.start();

		if(index < total){
			index++;
			execute();
		} else {
			process.stdout.write("\n\n all spinners done");
			spinner.stop();
		}
	}, _timeout); 
}

execute(0);
