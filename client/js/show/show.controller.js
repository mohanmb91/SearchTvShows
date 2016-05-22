angular.module('show.controller', [])
.filter('trustHTML',function($sce){
	return function(text){
	return $sce.trustAsHtml(text);
	}
})
.controller('ShowController', function ($scope,showId) {
				//console.log("controller"+showId);
				$scope.searchResultShow = showId;
});
