(function () {
	'use strict';

	angular
		.module('grubgroup')
		.factory('demoService', demoService);

	/**
	 * @ngdoc service
	 * @name grubgroup.service:demoService
	 * @description
	 *
	 */
	/*@ngInject*/
	function demoService($http, $q) {

		return {
			getFlickrImages: getFlickrImages,
			getUsCities: getUsCities
		};


		/**
		 * Load images from flickr
		 * @returns {promise.<Object>}
		 */
		function getFlickrImages(tagname) {
			var deferred = $q.defer();

			$http.jsonp('https://api.flickr.com/services/feeds/photos_public.gne?tags=' + tagname + '&format=json&callback=jsonFlickrFeed');

			// hacky way of doing this. see https://github.com/angular/angular.js/issues/1551
			window.jsonFlickrFeed = function(data){
				deferred.resolve(data);
			};

			return deferred.promise;
		}

		function getUsCities(address){
			return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
				params: {
					address: address,
					sensor:false
				}
			}).then(function(response){
				return response.data.results.map(function(item){
					return item.formatted_address;
				});
			})
		}




	}

})();