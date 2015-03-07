(function () {
	'use strict';

	angular
		.module('grubgroup')
		.provider('httpActivityInterceptor', httpActivityInterceptor);

	/**
	 * @ngdoc provider
	 * @name grubgroup.provider:httpActivityInterceptor
	 * @description
	 * Emits messages when $http activity occurs. Used in conjunction
	 * with ggLoadingIndicator directive
	 */
	/*@ngInject*/
	function httpActivityInterceptor() {

		/*@ngInject*/
		this.$get = function($q, $rootScope){
			/**
			 * Emit hide loader logic
			 *
			 * @param {object} config
			 * The response configuration
			 */
			var checkAndHide = function (config) {

				$rootScope.$emit('loaderHide', config.method);

			};

			return {
				/**
				 * Broadcast the loader show event
				 *
				 * @param {object} config
				 *
				 * @returns {object|promise}
				 */
				request: function (config) {

					$rootScope.$emit('loaderShow', config.method);

					return config || $q.when(config);
				},

				/**
				 * Broadcast the loader hide event
				 *
				 * @param {object} response
				 *
				 * @returns {object|promise}
				 */
				response: function (response) {
					checkAndHide(response.config);

					return response || $q.when(response);
				},

				/**
				 * Handle errors
				 *
				 * @param {object} response
				 *
				 * @returns {Promise}
				 */
				responseError: function (response) {
					checkAndHide(response.config);

					return $q.reject(response);
				}
			};
		}

	}

})();
