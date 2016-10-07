app.factory('profileFactory', function() {
    let profileFactory = {};


    profileFactory.fetchAllUserDrawings = (userId) => {

        console.log('Getting all user Drawing')
        return $http.get('api/user/:userId/drawings').then((userDrawings) => {
            console.log('Got the user Drawings',userDrawings)
            return userDrawings;
        })

    };

    return profileFactory;

})
