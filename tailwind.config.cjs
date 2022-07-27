module.exports = {
	content: ['./src/**/*.html', './src/**/*.svelte'],
	media: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			'roboto': ['Roboto Mono'],
		},
		extend: {
			backgroundImage: {
				'marble': "url(./src/assets/pexels-scott-webb-3255761.jpg)",
				'tile': "url(./src/assets/pexels-damir-mijailovic-3695238.jpg)"
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};