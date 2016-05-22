angular.module('search.controller', ['ngAnimate', 'ui.bootstrap','ngCookies','angular-uuid','firebase'])
.filter('trustHTML',function($sce){
	return function(text){
	return $sce.trustAsHtml(text);
	}
})
.directive('searchResult', function () {
		return {
			restrict: 'EA',
			scope: {
					data: '='
			},
			templateUrl: '../views/result.html'
		}
	})
	.controller('SearchController', ['$scope','searchResource','$cookies','uuid','$firebaseArray','$routeParams',
		function ($scope,searchResource,$cookies,uuid,$firebaseArray, $routeParams) {
			if($routeParams.searchtxt) {
				searchResource.query({
				searchTextTvShows: $routeParams.searchtxt,
			}, function (response) {	
				var result = response;
				if(result.length){
				$scope.resultNotFound = false;	
				$scope.searchResult = result;
			}
			else{
				$scope.searchResult = result;
				$scope.resultNotFound = true;
			}
			});			
			}
		$scope.resultNotFound = false;
		 var ref; 
		 var url = "https://incandescent-fire-9750.firebaseio.com/allHistory";
		  // create a synchronized array
		  if(!($cookies.get('uuidOfBrowser')) ){
			  	var expireDateForCookie = new Date();
	  			expireDateForCookie.setDate(expireDateForCookie.getDate() + 1);
				$cookies.put('uuidOfBrowser', uuid.v4(), { expires: expireDateForCookie });
			    $scope.currentBrowserCookie = $cookies.get('uuidOfBrowser');
			}
			else{
				  $scope.currentBrowserCookie = $cookies.get('uuidOfBrowser');
			}
			ref = new Firebase(url).orderByChild('id').equalTo($scope.currentBrowserCookie);
			$scope.allHistory = $firebaseArray(ref);	
		  $scope.addAllHistory = function() {
		  	var recordFound = '0';
		  	angular.forEach($scope.allHistory, function(eachHistory, key) {
		  	  if (eachHistory.id == $cookies.get('uuidOfBrowser')) {
			  	if(eachHistory.text == $scope.searchText){
				  	recordFound = '1';
				  }
			  }
			}); 
			if(recordFound == '0'){
			    $scope.allHistory.$add({
			      text: $scope.searchText,
			      id: $cookies.get('uuidOfBrowser')		      
			    });
			}
		    };	

		$scope.getTvShows = function () {
			searchResource.query({
				searchTextTvShows: $scope.searchText,
			}, function (response) {	
				var result = response;
				if(result.length){
				$scope.resultNotFound = false;	
				$scope.searchResult = result;
			}
			else{
				$scope.searchResult = result;
				$scope.resultNotFound = true;
			}
			});			
		};
}]);