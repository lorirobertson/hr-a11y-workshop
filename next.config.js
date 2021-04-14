const dev = process.env.NODE_ENV !== 'production';

module.exports = {
	cssModules: true,
	dev,
	dir: './src',
	future: {
		webpack5: true,
	},
}