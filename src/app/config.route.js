(function(){
	'use strict';

	angular
		.module('grubgroup')
		.config(routeConfig);

	/*@ngInject*/
	function routeConfig($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				views: {
					'navbar': {
						templateUrl: 'views/partials/navbar.html'
					},
					'': {
						templateUrl: 'views/home.html',
						controller: 'Home',
						controllerAs: 'main'
					}
				}
			})
			.state('home.teams', {
				url: 'teams',
				views: {
					'@': {
						templateUrl: 'views/teams.html',
						controller: 'Teams',
						controllerAs: 'vm'
					}
				}
			})
			.state('home.pictures', {
			    url: 'pictures',
			    views: {
			        '@': {
			            templateUrl: 'views/pictures.html',
			            controller: 'Pictures',
			            controllerAs: 'vm'
			        }
			    }
			});

	}

})();