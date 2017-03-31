function collate_config( ) {

	return {
		url: '/collate',
		views: {
			'content': {
				templateUrl: '/views/collate.html',
				controller: 'CollateController',
				controllerAs: 'collate'
			}
		}
	};

}