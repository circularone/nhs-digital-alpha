 (function() {

 	'use strict';

 	angular
	 	.module( 'nhs' )
	 	.config( config );

 	config.$inject = [ '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', '$sceDelegateProvider', '$urlMatcherFactoryProvider', '$provide', '$qProvider', 'ChartJsProvider' ];

 	function config( $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $sceDelegateProvider, $urlMatcherFactoryProvider, $provide, $qProvider, ChartJsProvider ) {

 		// HTML5 mode for pretty URLs

 		$locationProvider.html5Mode( true );

 		$httpProvider.useApplyAsync( true );

 		// Remove any trailing slashes from URLs as they break ui-router

		$urlRouterProvider.rule(function( $injector, $location ) {
			var path = $location.path();
			var hasTrailingSlash = path[path.length-1] === '/';
			if( hasTrailingSlash ) {
				var newPath = path.substr( 0, path.length - 1 ); 
				return newPath; 
			} 
		});

		ChartJsProvider.setOptions({ 
			colors : [ 
				'#803690', 
				'#E8EDEE', 
				'#DA291C', 
				'#00A499', 
				'#FAE100', 
				'#768692', 
				'#425563'
			],
			legend: {
				display: true,
				position: 'bottom'
			},
			global: {
				defaultFontFamily: 'raleway',
				defaultFontSize: 11,
				defaultFontStyle: '700'
			},
			animation: {
				duration: 2000
			}
		});

		// Catch all non defined routes

		$urlRouterProvider.otherwise( 'main.home' );

		// Main abstract parent state

		$stateProvider

		// Main

		.state( 'main', main_config() )

		// Understand 

		.state( 'main.understand', understand_config() )

		// Project 

		.state( 'main.project', project_config() )

		// Decide

		.state( 'main.decide', decide_config() )

		// Collate

		.state( 'main.collate', collate_config() )

		// Dashboard

		.state( 'main.dashboard', dashboard_config() )

		// Home (redundant - transitions to understand)

		.state( 'main.home', home_config() );

	}

})();