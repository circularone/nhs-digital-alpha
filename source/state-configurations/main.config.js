function main_config() {

	return {
		abstract: true,
		views: {
			'layout': {
				controller: 'MainController',
				controllerAs: 'main'
			}
		},
		resolve: {
			contacts: [ 'contactsFactory', function( contactsFactory ) {
				return contactsFactory.getContacts();	
			}]
		}
	};

}