	angular.module('searchhistory.controller', ['ngCookies','firebase'])
	.controller('SearchHistoryController',['$scope','$cookies','$firebaseArray', function ($scope,$cookies,$firebaseArray) {
	 var ref; 
		 $scope.resultNoFound = false;
		 var url = "https://incandescent-fire-9750.firebaseio.com/allHistory";
		  // create a synchronized array
		  if($cookies.get('uuidOfBrowser')){
		  
			    ref = new Firebase(url).orderByChild('id').equalTo($cookies.get('uuidOfBrowser'));
				$scope.allHistory = $firebaseArray(ref);
				console.log($scope.allHistoryResult);
			}
			if($scope.allHistory.length == 0){
				$scope.resultNoFound = true;
			}
			else
			{
				$scope.resultNoFound = false;
			}
}]);