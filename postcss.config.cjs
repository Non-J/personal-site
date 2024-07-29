module.exports = {
	plugins: [
		require('postcss-sort-media-queries')({
			sort: 'mobile-first',
		}),
		require('cssnano')({
			preset: [
				'default',
				{
					discardComments: {
						removeAll: true,
					},
					discardUnused: true,
					mergeIdents: true,
				},
			],
		}),
	],
};
