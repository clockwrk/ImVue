/* global app */
'use strict'
// app.controller('profileCtrl', function($scope, $state, memberFactory, member) {
app.controller('ProfileCtrl', function($scope, ProfileFactory, AuthService) {

    let geocoder = new google.maps.Geocoder;
    let projects;

    function toAddress(project) {
    	return new Promise( (resolve, reject) => {
    		let latlng = {lat: project.latitude, lng: project.longitude}
			geocoder.geocode({'location': latlng}, function(results, status) {
		        resolve(results[1].formatted_address);
		    });
    	})
	}
    
    AuthService.getLoggedInUser().then(function (user) {
        $scope.user = user;
        ProfileFactory.fetchAllUserProjects(user.id)
        .then(results => {
        	projects = results
        	let promises = []
        	projects.forEach(project => {
        		promises.push(toAddress(project))
        	})
        	// console.log(projects)
        	// $scope.projects = projects
        	return Promise.all(promises)
        })
        .then(addresses => {
        	for(let i=0;i<addresses.length;i++){
        		projects[i].address = addresses[i]
        	}
        	$scope.projects = projects
        })
    });

    var fake = []
    for(var i=0;i<20;i++){
    	fake.push({date:i + '/15/2004', location: '5 Hanover Square NY, NY'})
    }

})
