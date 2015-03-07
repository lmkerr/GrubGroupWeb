(function(){
    'use strict';

    angular
        .module('grubgroup')
        .directive('ggLoadingIndicator', ggLoadingIndicator);

    /**
     * @ngdoc directive
     * @name grubgroup.directive:ggLoadingIndicator
     * @restrict E
     * @param {Number} minDuration - The minimum number in seconds the loader should stay visible for
     * @description
     * Displays a loading indicator during $http activity
     */
     /*@ngInject*/
    function ggLoadingIndicator($rootScope, $parse, $timeout){
        return {
            restrict: 'E',
	        replace: true,
	        templateUrl: 'directives/ggLoadingIndicator.html',
	        scope: {
		      minDuration: '@'
	        },
            link: link
        };

        function link($scope, elem, attrs){
			$scope.isLoading = false;

	        var minDuration = $parse($scope.minDuration)() || $scope.minDuration;
	        minDuration = angular.isUndefined(minDuration) ? 0 : minDuration;
	        minDuration = Number(minDuration) * 1000;
	        minDuration = angular.isNumber(minDuration) ? minDuration : 0;

	        var timeoutId,
		        showLoader = $scope.isLoading;

	        /**
	         * Toggle the display of the loader.
	         *
	         * @param {object} event
	         */
	        var toggleShowLoader = function (event) {
			    showLoader = (event.name === 'loaderShow');

		        if (minDuration <= 0 || (!timeoutId && !showLoader)) {
			        $scope.isLoading = showLoader;
			        return;
		        } else if (timeoutId) {
			        return;
		        }

		        $scope.isLoading = showLoader;
		        timeoutId = $timeout(function () {
			        if (!showLoader) {
				        $scope.isLoading = showLoader;
			        }
			        timeoutId = undefined;
		        }, minDuration);
	        };

	        $rootScope.$on("loaderShow", toggleShowLoader);
	        $rootScope.$on("loaderHide", toggleShowLoader);
        }
    }
})();
