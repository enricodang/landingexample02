module.exports = {
	ftp: {
		host: '',
		user: '',
		psw: '',
		root: ''
	},
	src: {
		scripts: {
			vendor:
				[
				,'./node_modules/jquery/dist/jquery.js'
				,'./node_modules/waypoints/lib/jquery.waypoints.js'
				,'./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
				],
			app:
				['../src/js/*.js']
		},
		sass: [
				 '../src/scss/theme.scss'
		],
		sasswatch: [
				 '../src/scss/*.scss'
		],
		php: [
				'../template-parts/**/*.php'
				,'../*.php'
		],
		fonts: [
				 './node_modules/slick-carousel/slick/fonts/*.*'
		]
	},
	autoprefixerOptions: {
		browsers: ['last 2 versions']
	},
	globs: [
		'../dist/**'
	],
	production: {
		domain: 'developing.enricodangelo.com'
	}
};