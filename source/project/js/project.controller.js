(function() {
	'use strict';

	angular
	.module( 'nhs' )
	.controller( 'ProjectController', ProjectController );

	ProjectController.$inject = [ '$scope', '$interval' ];

	function ProjectController( $scope, $interval ) {

		var project = this;
		project.random_user = Math.floor( ( Math.random() * 1000 ) + 1 );

		// Top graph

		project.chart = {};
		project.chart.labels = ["2019", "2020", "2021", "2022", "2023", "2024"];
		project.chart.series = ['BUDGET', 'HIP REPLACEMENTS', 'TRAMADOL PRESCRIPTIONS'];
		project.chart.data = [
			[5, 10, 15, 20, 25, 30, 35],
			[10, 14, 18, 32, 26, 48, 48],
			[16, 22, 28, 38, 42, 24, 10]
		];

		// Switch models

		project.switch_model = [
			true, 
			false,
			true,
			true,
			false
		];

		// Slider models

		project.slider_models = [
			40,
			80,
			12,
			26
		];

		project.show_query_results = function(event) {
			event.preventDefault();
			project.reveal_results = true;
		};

		project.clear_query = function() {

		};

		// Randomise based on user action

		project.randomize = function () {
			project.chart.data = project.chart.data.map( function( data ) {
				return data.map(function (y) {
					y = y + Math.random() * 4 - 2;
					return parseInt(y < 0 ? 0 : y > 100 ? 100 : y);
				});
			});
		};

		project.increment = function( min, max ) {
			project.chart.data = project.chart.data.map( function( data ) {
				return data.map( function( y ) {
					min = Math.ceil( min );
					max = Math.floor( max );
					return y + Math.floor(Math.random() * ( max - min ) ) + min;
				});
			});
		};

		project.real_time = $interval( function() {
			project.increment( 1, 3 );
		}, 5000 );


		project.open_case_study = function( title ) {
			project.case_study_open = true;
			project.case_study_title = title + ' Case Study';
		};

		// Case study graph

		project.case_study = {};
		project.case_study.labels = ["2019", "2020", "2021", "2022", "2023"];
		project.case_study.series = ['HIP REPLACEMENTS', 'WEATHER', 'TRAMADOL PRESCRIPTIONS'];
		project.case_study.data = [
			[4, 12, 60, 54, 72, 90],
			[10, 14, 18, 32, 26, 48],
			[16, 22, 28, 38, 42, 48]
		];

		angular.forEach( project.case_study.data, function( value, key ) {
			project.case_study.data[key].reverse();
		});

		project.uptake = {
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

		project.enable_fragility = true;
		project.enable_obesity = true;
		project.enable_physio = true;
		project.enable_lifestyle = true;

		// Availability chart

		project.availability = {
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

		project.increment_availability = function() {
			angular.forEach( project.availability.data, function( value, key ) {
				angular.forEach( value, function( v, k ) {
					if( Math.random() < 0.5 ) {
						var min = Math.ceil( parseInt( v ) - 2 );
						var max = Math.floor( parseInt( v ) + 2 );
						project.availability.data[key][k] = Math.random() * ( max - min ) + min;
					}
				});
			});
		};

		project.real_time_availability = $interval( function() {
			project.increment_availability();
		}, 3000 );

		$scope.$on( '$destroy', function() {
			$interval.cancel( project.real_time );
			$interval.cancel( project.real_time_availability );
			project = null;
		});


	}

})();