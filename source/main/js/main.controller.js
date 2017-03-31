(function() {

	'use strict';

	angular
		.module( 'nhs' )
		.controller( 'MainController', MainController );

	MainController.$inject = [ '$window', '$rootScope', '$scope', 'contacts', '$timeout', '$state', '$interval' ];

	function MainController( $window, $rootScope, $scope, contacts, $timeout, $state, $interval ) {

		var main = this;
		main.contacts = contacts;

		$rootScope.mobile = ( $window.innerWidth < 961 ? true : false );

		main.reset_menus = function() {
			$timeout( function() {
				if( main ) {
					main.menu_open = ! $rootScope.mobile;
				}
			});
		};

		main.toggle_menu = function() {
			main.menu_open = ! main.menu_open;
		};

		main.reset_menus();

		main.is_mobile = function() {
			$timeout( function() {
				$rootScope.mobile = ( $window.innerWidth < 961 ? true : false );
				main.reset_menus();
				$rootScope.$broadcast( 'window-resized' );
			});
		};

		main.resize_event = function() {
			$timeout.cancel( main.after_resize );
			main.after_resize = $timeout( function() {
				main.is_mobile();
			}, 750);
		};

		angular.element( $window ).on( 'resize', main.resize_event );

		$scope.$on( '$stateChangeStart', main.reset_menus );

		main.toggle_chat = function() {
			$timeout( function() {
				if( main.chat_open ) {
					$rootScope.classes.splice( $rootScope.classes.indexOf( 'chat-open' ), 1 );
				} else {
					$rootScope.classes.push( 'chat-open' );
				}
				main.chat_open = ! main.chat_open;
			});
		};

		main.random_users = [
			Math.floor( ( Math.random() * 1000 ) + 1 ),
			Math.floor( ( Math.random() * 1000 ) + 1 ),
			Math.floor( ( Math.random() * 1000 ) + 1 ),
			Math.floor( ( Math.random() * 1000 ) + 1 )
		];

		main.message_list = [];

		angular.forEach( main.random_users, function( value, key ) {
			main.message_list.push( main.contacts[value] );
			main.message_list[key].messages[0].date = new Date().toDateString();
		});

		main.message_provider = $interval( function() {
			var i = Math.floor( ( Math.random() * 900 ) + 1 );
			main.message_list.unshift( main.contacts[i] );
			var date = new Date();
			main.message_list[0].messages[0].date = date.toDateString() + ' - ' + date.toLocaleTimeString();
			if( main.message_timeout ) {
				$timeout.cancel( main.message_timeout );
				main.message = null;
			}
			main.message_added = 'New message from ' + main.contacts[i].first_name + ' ' + main.contacts[i].last_name;
			main.message_timeout = $timeout( function() {
				main.message_added = null;
			}, 3200 );
			if( main.message_list.length > 19 ) {
				main.message_list.pop();
			}
		}, Math.floor( ( Math.random() * 17000 ) + 5000 ) );

		$scope.$on( '$stateChangeStart', function() {
			main.chat_open = false;
			if( $rootScope.classes.indexOf( 'chat-open' ) > -1 ) {
				$rootScope.classes.splice( $rootScope.classes.indexOf( 'chat-open' ), 1 );
			}
		});

		main.listen = $scope.$on( 'collate', function() {
			main.chat_open = true;
			$rootScope.classes.push( 'chat-open' );
		});

		$scope.$on( '$destroy', function() {
			main = null;
		});

	}
	
})();