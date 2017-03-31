(function() {

	'use strict';

	angular
		.module( 'nhs' )
		.controller( 'DecideController', DecideController );

	DecideController.$inject = [ '$scope', '$rootScope', 'contacts' ];

	function DecideController( $scope, $rootScope, contacts ) {

		var decide = this;
		decide.contacts = contacts;

		decide.hide_suggestions = function() {
			if( ! decide.block_remove ) {
				decide.show_suggestions = false;
			}
		};

		decide.select_user = function( index ) {
			decide.block_remove = false;
			decide.show_suggestions = false;
		};

		decide.set_active_day = function( event ) {
			angular.element( '.day.active' ).removeClass( 'chosen' );
			angular.element( event.target ).addClass( 'chosen' );
		};

		$scope.$on( '$destroy', function() {
			decide = null;
		});

	}
	
})();