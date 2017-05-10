# braille-loaders
> Elegant colorful 60+ spinners inspired by cli-spinners

## Install
``` bash
	npm install braille-loaders --save
```
## Usage

``` Javascript
const brailleLoader = require('baraille-loaders');


var loader = new brailleLoader({
	spinner: 'clock',
	color: 'green'
})

loader.start(); // starting loader
loader.stop(); // stopping loader
loader.setText('Loading pages'); // updating text of loader

```

## API

#### constructor ([options|text])
Incase if a string is provided default dots spinner will be used.

#### options
Type: `Object`

#### text
Type: `string`

Text that will be displayed with spinner

#### spinner
Type: `string`
Default: dots

Note: For list of spinners see cli-spinners `spinner.json`

### color
Type: `string`
Default: `white`
options: `black` `red` 	`green` `yellow` `cyan` `blue` `purple`


### Example

``` Javascript
	var brailleloader = require('braille-loader');
	var loader = new braillloader({
		spinner: 'clock',
		color: 'green',
		text: 'loading'
	})

	loader.start();
```

### Output
![Imgur](https://github.com/kailashyogeshwar85/braille-loaders/blob/master/images/demo.gif "Demo")

### Related
cli-spinners

### License
MIT © Kailash K Yogeshwar

Happy Coding.