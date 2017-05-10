'use strict';

const readline         = require('readline');
const _                = require('lodash');
const colors           = require('./colors');
const utils            = require('util'); 
const spinners         = require('cli-spinners')
BrailleLoader.spinners = spinners;

var _defaultOptions = {
	color: 'white',
	frames: null,
	currentFrame: 0,
	speed: 80,
	spinner: 'dots',
	spinnerId: 0,
	text: ''
};


function BrailleLoader(options){
	if (typeof options === 'string'){
		this.options = _.extend({}, _defaultOptions, { 'text': options });
		this.options.frames = this.getSpinner(_defaultOptions.spinner).frames;
		this.options.speed = this.getSpinner(_defaultOptions.spinner).interval;
	} else {
		this.options = _.extend({}, _defaultOptions, options);
		this.options.frames = this.getSpinner(this.options.spinner).frames;
		this.options.speed = this.getSpinner(this.options.spinner).interval;
	}
}

BrailleLoader.prototype.start = function(){
	var self = this;
	process.stdout.write(self.options.frames[self.options.currentFrame]);
  process.stdout.write('\x1b[?25l');// blink cursor off	
	self.options.spinnerId = setInterval(function(){	
		self.paintFrames()
	},self.options.speed);
}

BrailleLoader.prototype.stop = function(){
		this.destroy();
}

BrailleLoader.prototype.destroy = function(){
	clearInterval(this.options.spinnerId);
	process.stdout.write('\x1B[?25h')//show's the cursor
	process.stdout.write('\x1B[0m') // reset the prompt
}

BrailleLoader.prototype.getColor = function(){
	return colors[this.options.color.toLowerCase()] || '\x1b[37m';
}

BrailleLoader.prototype.setColor = function(color){
	this.color = color;
}

BrailleLoader.prototype.paintFrames = function(){
	this.clear(); // clear previous output
	var colorCode = this.getColor();
	this.options.currentFrame++;
	if(this.options.currentFrame >= this.options.frames.length){
		this.options.currentFrame	 = 0;
	}
	readline.moveCursor(process.stdout, -this.options.frames[this.options.currentFrame].length , 0);
	var str = `${this.getColor()}${this.options.frames[this.options.currentFrame]} ${this.options.text}`
	process.stdout.write('\r' + str);
}

BrailleLoader.prototype.getSpinner = function(spinner){
	if (!spinners[spinner]){
		console.warn('Invalid spinner type refer cli-spinners for all types');
		resetPrompt();
		return;
	}
	return spinners[spinner];
}

BrailleLoader.prototype.clear = function(){
	process.stdout.clearLine();
}

BrailleLoader.prototype.setText = function(str){
	this.options.text = str;
}

function resetPrompt(){
	process.stdout.write('\x1B[?25h')//show's the cursor
	process.stdout.write('\x1B[0m') // reset the prompt
	process.exit(0);	
}

process.on('SIGINT', resetPrompt);

module.exports = BrailleLoader;
