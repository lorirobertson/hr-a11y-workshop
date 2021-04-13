require('dotenv').config();
const dev = process.env.NODE_ENV !== 'production';

module.exports ={
	cssModules: true,
	dev,
	dir: './src/client',
	future: {
		webpack5: true,
	},
}