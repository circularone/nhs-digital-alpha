(function() {
	'use strict';

	angular
	.module( 'nhs' )
	.controller( 'UnderstandController', UnderstandController );

	UnderstandController.$inject = [ '$scope', '$timeout', '$interval' ];

	function UnderstandController( $scope, $timeout, $interval ) {

		var understand = this;
		understand.random_user = Math.floor( ( Math.random() * 1000 ) + 1 );

		// Top graph

		understand.chart = {};
		understand.chart.labels = ["2019", "2020", "2021", "2022", "2023"];
		understand.chart.series = ['BUDGET', 'HIP REPLACEMENTS', 'TRAMADOL PRESCRIPTIONS'];
		understand.chart.data = [
			[5, 10, 15, 20, 25, 30],
			[10, 14, 18, 32, 26, 48],
			[16, 22, 28, 38, 42, 48]
		];

		// Query chart

		understand.uptake = {};
		understand.uptake.labels = ['Pregnant', '6 months - 65 at risk', '65+',];
		understand.uptake.series = ['Registered patients', '2016 uptake', 'Projected uptake'];
		understand.uptake.legend = ['Total patients', '2016 uptake', 'Projected uptake'];

		understand.uptake.data = [
			[20491, 14429, 1376],
			[14606, 5865, 633],
			[18200, 10500, 1100]
		];

		angular.forEach( understand.uptake.data, function( value, key ) {
			understand.uptake.data[key].reverse();
		});

		understand.result_chart = {};
		understand.result_chart.data = [ '38' ];
		understand.result_chart.labels = [ '38' ];
		understand.result_chart.series = [ 'West Chesire' ];
		understand.result_chart.options = { legend: { display: false } };

		understand.update_chart = function() {
			understand.result_chart.data = [ 
				'38',
				'32',
				'47',
				'22'
			];
			understand.result_chart.labels = [ 
				'38',
				'32',
				'47',
				'22'
			];
			understand.result_chart.series = [ 
				'West Chesire',
				'Bracknell And Ascot',
				'Brent',
				'Cannock Chase'
			];
		};

		understand.open_case_study = function( title ) {
			understand.case_study_open = true;
			understand.case_study_title = title + ' Case Study';
		};

		understand.search = function() {
			if( understand.query ) {
				if( ! understand.show_results ) {
					understand.show_results = true;
				} else {
					understand.show_second_query_data = true;
					understand.update_chart();
				}
			}
		}

		// Case study graph

		understand.case_study = {};
		understand.case_study.labels = ["2019", "2020", "2021", "2022", "2023"];
		understand.case_study.series = ['HIP REPLACEMENTS', 'WEATHER', 'TRAMADOL PRESCRIPTIONS'];
		understand.case_study.data = [
			[4, 12, 60, 54, 72, 90],
			[10, 14, 18, 32, 26, 48],
			[16, 22, 28, 38, 42, 48]
		];

		angular.forEach( understand.case_study.data, function( value, key ) {
			understand.case_study.data[key].reverse();
		});

		understand.initialize_capabilities = function() {
			understand.hospital_capabilities = [{title: 'Leeds General Infirmary', count: 114, width: '0%'}, {title: 'St James\'s University Hospital', count: 86, width: '0%' }, {title: 'Chapel Allerton Hospital', count: 65, width: '0%'}, {title: 'Leeds Children\'s Hospital', count: 58, width: '0%'}, {title: 'Leeds Dental Institute', count: 87, width: '0%' }, {title: 'Seacroft Hospital', count: 87, width: '0%'}, {title: 'Wharfedale Hospital', count: 97, width: '0%' } ];
		};

		understand.initialize_capabilities();

		understand.animate_number = function( start, end, index, duration ) {

			if( ! understand.interval ) {
				understand.interval = [];
			}

			understand.interval[index] = $interval( function() {
				understand.hospital_capabilities[index].display_count = start;
				if( start == end ) {
					if( start > 95 ) understand.hospital_capabilities[index].pulse = true;
					 $interval.cancel( understand.interval[index] );
				} else {
					start++;
				}
			}, duration );

		};

		understand.reveal_capability = function( index ) {
			$timeout( function() {
				understand.animate_number( 0, understand.hospital_capabilities[index].count, index, 10 );
				if( understand.hospital_capabilities[index].count > 90 ) understand.hospital_capabilities[index].alert = true;
				$timeout( function() {
					understand.hospital_capabilities[index].width = ( understand.hospital_capabilities[index].count > 100 ? '100%' : understand.hospital_capabilities[index].count + '%' );
				}, 200 );
				if( index < ( understand.hospital_capabilities.length - 1 ) ) {
					understand.reveal_capability( ( index + 1 ) );
				}
			}, 400);
		};

		understand.toggle_capabilities = function() {
			if( ! understand.show_at_risk_areas ) {
				understand.reveal_capability(0);
			} else {
				angular.forEach( understand.hospital_capabilities, function( value, key ) {
					understand.initialize_capabilities();
				});
			}
			understand.show_at_risk_areas = ! understand.show_at_risk_areas;
		};

		$scope.$on( '$destroy', function() {
			understand = null;
		});

	}

})();