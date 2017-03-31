function understand_config( ) {

	return {
		url: '/understand',
		views: {
			'content': {
				templateUrl: '/views/understand.html',
				controller: 'UnderstandController',
				controllerAs: 'understand'
			}
		}
	};

}