var Vue = require('vue')
var Color = require('color')

var backgroundColors = require('colors.css')

var textColors = {
	'lighten-1': 'rgba(255, 255, 255, .875)',
	'lighten-2': 'rgba(255, 255, 255, .75)',
	'lighten-3': 'rgba(255, 255, 255, .5)',
	'darken-1': 'rgba(0, 0, 0, .875)',
	'darken-2': 'rgba(0, 0, 0, .75)',
	'darken-3': 'rgba(0, 0, 0, .5)'
}


var combos = []

Object.keys(backgroundColors).forEach(function (bg) {
	Object.keys(textColors).forEach(function (text) {
		var backgroundColor = Color(backgroundColors[bg])
		backgroundColor.name = bg

		var textColor = Color(textColors[text])
		textColor.name = text

		var mixed = Color(textColor.hexString()).mix(backgroundColor, textColor.values.alpha)
		var contrast = mixed.contrast(backgroundColor)

		combos.push({
			backgroundColor: backgroundColor,
			textColor: textColor,
			contrast: contrast
		})
	})
})

combos.sort(function (a, b) {
	return b.contrast - a.contrast
})


var app = new Vue({
	data: {
		combos: combos
	}
})

app.$mount(document.body)
