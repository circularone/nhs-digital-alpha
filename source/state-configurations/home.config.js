function home_config() {

	return {
		url: '/',
		views: {
			'content': {
				templateUrl: '/views/home.html',
				controller: 'HomeController',
				controllerAs: 'home'
			}
		}
	};

}