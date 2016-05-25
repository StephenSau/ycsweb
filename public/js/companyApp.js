(function (angular) {
	'use strict';
	var app = angular.module('app', []);
	app.controller('companyCtrl', ['$scope', '$http', function ($scope, $http) {
		var prefix = window.location.href.indexOf('test.ycs.com') !== -1 ? "../" : ( window.location.href.indexOf('www.ycs.com') !== -1 ? "http://static.ycs.com/" : "http://static.1caishui.com/"),
			typeActive = 8,
			classActive = 1,
			nameActive = 8;
		$scope.company = {};
		$http.get(prefix + 'public/js/vendor/industry.min.json').success(function (data){
			$scope.industry = data;
			$scope.industryType = data;
			$scope.industryType[typeActive].active = true;
			$scope.industryClass = data[typeActive].sub;
			$scope.industryClass[classActive].active = true;
			$scope.industryName = data[typeActive].sub[classActive].sub;
			$scope.industryName[nameActive].active = true;
			$scope.company.industry = $scope.industryName[nameActive].value;
			$scope.company.city = "广州";
			$scope.company.name = "浠牛";
			$scope.company.type ="有限公司";
		});
		function reset(list){
			for(var i = 0, length = list.length; i < length; i += 1) {
				delete list[i].active;	
			}

		}
		$scope.picker = function (index, list) {
			var current = 0,
				next = 0;
			switch(list){
				case 'industryType':
					if (list === "industryType" && index === typeActive) {
						return;
					}
					current = typeActive;
					next = index;
					typeActive = next;
					reset($scope.industryClass);
					classActive = 0;
					$scope.industryClass = $scope.industryType[typeActive].sub
					$scope.industryClass[classActive].active = true;
				case 'industryClass':
					if (list === "industryClass" && index === classActive) {
						return;
					}
					if(list === "industryClass") {
						current = classActive;
						next = index;
						classActive = next;
					}
					reset($scope.industryName);
					nameActive = 0;
					$scope.industryName = $scope.industryClass[classActive].sub
					$scope.industryName[nameActive].active = true;
				case 'industryName':
					if (list === "industryName" && index === nameActive) {
						return;
					}
					if(list === "industryName") {
						current = nameActive;
						next = index;
						nameActive = next;
					}
					$scope.company.industry = $scope.industryName[nameActive].value
			}
			delete $scope[list][current].active;
			$scope[list][next].active = true;
		};
		
	}]);
}(window.angular));