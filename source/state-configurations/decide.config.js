function decide_config() { 

	return {
		url: '/decide',
		views: {
			'content': {
				templateUrl: '/views/decide.html',
				controller: 'DecideController',
				controllerAs: 'decide'
			}
		}
	};

}