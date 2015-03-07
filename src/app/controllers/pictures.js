(function () {
	'use strict';

	angular
		.module('grubgroup')
		.controller('Pictures', Pictures);

	/**
	 * @ngdoc controller
	 * @name grubgroup.controller:Pictures
	 * @description
	 *
	 */
	/*@ngInject*/
	function Pictures(demoService) {
		var vm = this;


		// PUBLIC PROPERTIES
		vm.title = 'Pictures';
		vm.searchval = '';
		vm.pics = [];


		// PUBLIC FUNCTIONS
		vm.loadimages = loadimages;

		// init
		activate();


		//
		// PRIVATE FUNCTIONS

		function activate() {
			loadimages();
		}

		function loadimages() {
			demoService.getFlickrImages(vm.searchval).then(function(data){
				vm.pics = data.items;
			});
		}

	}

})();
