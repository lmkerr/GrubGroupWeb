(function () {
	'use strict';

	angular
		.module('grubgroup')
		.config(configHttpInterceptors);

	/*@ngInject*/
	function configHttpInterceptors($httpProvider){
		$httpProvider.interceptors.push('httpActivityInterceptor');
	}

})();

