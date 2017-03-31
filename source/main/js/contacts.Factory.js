(function() {

	'use strict';

	angular
		.module( 'nhs' )
		.factory( 'contactsFactory', contactsFactory );

	contactsFactory.$inject = [ '$http' ];

	function contactsFactory( $http ) {

		return {
			getContacts: getContacts
		};

		function getContacts( slug ) {
	        
			return $http.get( '/assets/js/contacts.js' )
				.then( getContactsComplete )
				.catch( getContactsFailed );

			function getContactsComplete( response ) {
				return response.data;
			}

			function getContactsFailed( error ) {
				console.log('XHR Failed for getContacts.' + error.data);
			}

		}

	}

})();