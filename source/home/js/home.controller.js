(function() {

	'use strict';

	angular
		.module( 'nhs' )
		.controller( 'HomeController', HomeController );

	HomeController.$inject = [ '$scope', '$state' ];

	function HomeController( $scope, $state ) {

		var home = this;

		// This state now unecessary - go to start of journey

		$state.go( 'main.understand' );

		$scope.$on( '$destroy', function() {
			home = null;
		});

	}
	
})();