(function() {

	'use strict';

	angular
		.module( 'nhs' )
		.directive( 'siteLoader', siteLoader );

	function siteLoader() {

		return {
			restrict: 'E',
			template: '<div class="loader-wrap" data-ng-if="loading"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/></svg></div>'
		};

	}

})();