function proposal_config() {

	return {
		url: '/proposal',
		views: {
			'content': {
				templateUrl: '/views/proposal.html',
				controller: 'ProposalController',
				controllerAs: 'proposal'
			}
		}
	};

}