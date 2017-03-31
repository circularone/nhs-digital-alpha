(function() {

	'use strict';

	angular
		.module( 'nhs' )
		.controller( 'HomeController', HomeController );

	HomeController.$inject = [ '$scope', '$state' ];

	function HomeController( $scope, $state ) {

		var home = this;

		$state.go( 'main.understand' );

		$scope.$on( '$destroy', function() {
			home = null;
		});

	}
	
})();