(function() {

	'use strict';

	angular
		.module( 'nhs' )
		.run( run );

	run.$inject = [ '$rootScope', '$window', '$timeout', '$state', '$location' ];

	function run( $rootScope, $window, $timeout, $state, $location ) {

		// Body classes

		$rootScope.classes = [];

		// State change start

		$rootScope.$on( '$stateChangeStart', function( event, toState, toParams, fromState, fromParams, options ) {
			$rootScope.classes = [];
			$rootScope.fixed = false;
			$rootScope.loading = true;
		});


		// State change success

		$rootScope.$on( '$stateChangeSuccess', function( event, toState, toParams, fromState, fromParams, options ) {
			$window.scrollTo(0, 0);
			$rootScope.loading = false;
			$rootScope.classes.push( toState.name.split( '.' ).join( '-' ).replace( '_', '-' ) );
		});

	}

})();