
(function () {
	'use strict';



	angular
		.module('grubgroup')
		.controller('Home', Home);

	/**
	 * @ngdoc controller
	 * @name grubgroup.controller:Index
	 * @description
	 *
	 */
	/*@ngInject*/
	function Home() {
		var vm = this;

		// PUBLIC PROPERTIES
		vm.title = 'Index';

	}

})();
