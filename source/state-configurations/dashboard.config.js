function dashboard_config() {

	return {
		url: '/dashboard',
		views: {
			'content': {
				templateUrl: '/views/dashboard.html',
				controller: 'DashboardController',
				controllerAs: 'dashboard'
			}
		}
	};

}