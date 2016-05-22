angular.module('app', ['ngRoute', 'ngResource','search.controller','search.service','searchhistory.controller','schedule.controller','favorites.controller','show.controller','show.service'])
	.config(['$routeProvider', '$locationProvider', 
		function ($routeProvider, $locationProvider) {

			$routeProvider
				.when('/', {
					templateUrl: 'views/search.html',
					controller: 'SearchController',
			})
				.when('/schedule', {
					templateUrl: 'views/schedule.html',
					controller: 'ScheduleController'
				})
				.when('/favorites',{
					templateUrl: 'views/favorites.html',
					controller: 'SearchHistoryController'
				})
				.when('/SearchHistory',{
					templateUrl: 'views/SearchHistory.html',
					controller: 'SearchHistoryController'
				})
				.when('/show/:id',{
					templateUrl: 'views/show.html',
					controller: 'ShowController',
					resolve: {
		            showId: function ($route, showResource) {
		              return showResource.get({id: $route.current.params.id});
		            }
		        }
				})
				.otherwise({
					redirectTo: '/'
				});

			$locationProvider.html5Mode(true);
	}]);

	