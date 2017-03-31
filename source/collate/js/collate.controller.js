(function() {
	'use strict';

	angular
	.module( 'nhs' )
	.controller( 'CollateController', CollateController );

	CollateController.$inject = [ '$rootScope', '$scope', '$interval' ];

	function CollateController( $rootScope, $scope, $interval ) {

		var collate = this;
		collate.random_user = Math.floor( ( Math.random() * 1000 ) + 1 );

		$rootScope.$broadcast( 'collate' );

		// Top graph

		collate.chart = {};
		collate.chart.labels = ["2019", "2020", "2021", "2022", "2023", "2024"];
		collate.chart.series = ['BUDGET', 'HIP REPLACEMENTS', 'TRAMADOL PRESCRIPTIONS'];
		collate.chart.data = [
			[5, 10, 15, 20, 25, 30, 35],
			[10, 14, 18, 32, 26, 48, 48],
			[16, 22, 28, 38, 42, 24, 10]
		];

		// Switch models

		collate.switch_model = [
			true, 
			false,
			true,
			true,
			false
		];

		// Slider models

		collate.slider_models = [
			40,
			80,
			12,
			26
		];

		collate.show_query_results = function(event) {
			event.preventDefault();
			collate.reveal_results = true;
		};

		collate.clear_query = function() {

		};

		// Randomise based on user action

		collate.randomize = function () {
			collate.chart.data = collate.chart.data.map( function( data ) {
				return data.map(function (y) {
					y = y + Math.random() * 4 - 2;
					return parseInt(y < 0 ? 0 : y > 100 ? 100 : y);
				});
			});
		};

		collate.increment = function( min, max ) {
			collate.chart.data = collate.chart.data.map( function( data ) {
				return data.map( function( y ) {
					min = Math.ceil( min );
					max = Math.floor( max );
					return y + Math.floor(Math.random() * ( max - min ) ) + min;
				});
			});
		};

		collate.real_time = $interval( function() {
			collate.increment( 1, 3 );
		}, 5000 );


		collate.open_case_study = function( title ) {
			collate.case_study_open = true;
			collate.case_study_title = title + ' Case Study';
		};

		// Case study graph

		collate.case_study = {};
		collate.case_study.labels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
		collate.case_study.series = ['Budget'];
		collate.case_study.data = [
			[6, 8.2, 7.5, 5.4, 5.8, 6.2, 6.3, 6.58, 5.4, 5.2, 4.8, 4],
		];

		// angular.forEach( collate.case_study.data, function( value, key ) {
		// 	collate.case_study.data[key].reverse();
		// });

		collate.uptake = {
			series: [
				'NHS Croydon CCG',
				'NHS Aylesbury Vale CCG',
				'HS Cumbria CCG',
				'NHS Medway CCG'
			],
			labels: ["Previous surgery","Living Arrangements","Disability","Heart Disease","High Blood Pressure","Stroke","Circulation","Lung Disease","Diabets","Cancer","Depression","Arthritis"],
			data: [
				["4","3","8","7","7","6","4","7","2","2","4","7"], 
				["6","2","7","5","6","5","3","6","2","1","5","6"], 
				["8","1","3","3","9","6","5","8","3","5","3","7"], 
				["7","5","5","5","5","6","4","7","2","2","4","5"]
			],
			options: {
		        scales: {
		            xAxes: [{
		                barThickness: 4
		            }],
		            yAxes: [{
		                barThickness: 4
		            }]
		        }
			}
		};

		collate.enable_fragility = true;
		collate.enable_obesity = true;
		collate.enable_physio = true;
		collate.enable_lifestyle = true;

		// Availability chart

		collate.availability = {
			series: [
				'Leeds General Infirmary',
				'St Jamess University Hospital',
				'Chapel Allerton Hospital',
				'Seacroft Hospital',
				'Wharfedale Hospital'
			],
			labels: [
				'Clinicians',
				'Surgeons',
				'Beds',
				'Nursing staff'
			],
			data: [
				['24', '48', '42', '63', '43'],
				['31', '29', '36', '15', '47'],
				['27', '22', '52', '14', '52'],
				['28', '19', '42', '39', '18'],
				['36', '15', '37', '28', '58'],
				['29', '26', '49', '45', '65']
			],
			options: {
		        scales: {
		            xAxes: [{
		                barThickness: 4
		            }],
		            yAxes: [{
		                barThickness: 4
		            }]
		        }
			}
		};

		collate.increment_availability = function() {
			angular.forEach( collate.availability.data, function( value, key ) {
				angular.forEach( value, function( v, k ) {
					if( Math.random() < 0.5 ) {
						var min = Math.ceil( parseInt( v ) - 2 );
						var max = Math.floor( parseInt( v ) + 2 );
						collate.availability.data[key][k] = Math.random() * ( max - min ) + min;
					}
				});
			});
		};

		collate.real_time_availability = $interval( function() {
			collate.increment_availability();
		}, 3000 );

		$scope.$on( '$destroy', function() {
			$interval.cancel( collate.real_time );
			$interval.cancel( collate.real_time_availability );
			collate = null;
		});


	}

})();