(function() {

	'use strict';

	angular
		.module( 'nhs' )
		.controller( 'DashboardController', DashboardController );

	DashboardController.$inject = [ '$scope', 'contacts' ];

	function DashboardController( $scope, contacts ) {

		var dashboard = this;
		dashboard.contacts = contacts;

		dashboard.graph = {
			labels: ["JAN","FEB","MAR","APR","MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
			series: ['Projected','Actual'],
			data: [
				[
					'8.333333333333333',
					'16.666666666666667',
					'25',
					'33.333333333333333',
					'41.666666666666666',
					'50',
					'58.333333333333333',
					'66.666666666666666',
					'75',
					'83.333333333333333',
					'91.666666666666666',
					'100'
				],
				['9','14','21','28','75']
			]
		};

		$scope.$on( '$destroy', function() {
			dashboard = null;
		});

	}
	
})();