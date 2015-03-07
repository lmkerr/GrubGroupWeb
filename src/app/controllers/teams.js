(function () {
	'use strict';

	angular
		.module('grubgroup')
		.controller('Teams', Teams);

	/**
	 * @ngdoc controller
	 * @name grubgroup.controller:Teams
	 * @description
	 *
	 */
	/*@ngInject*/
	function Teams() {
		var vm = this;


		// PUBLIC PROPERTIES
		vm.title = 'Teams';


		// PUBLIC FUNCTIONS
		vm.doSomething = doSomething;

		// init
		activate();


		//
		// PRIVATE FUNCTIONS

		function activate() {
		}

		function doSomething() {

		}

	}

})();