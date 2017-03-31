function project_config( ) {

	return {
		url: '/project',
		views: {
			'content': {
				templateUrl: '/views/project.html',
				controller: 'ProjectController',
				controllerAs: 'project'
			}
		}
	};

}