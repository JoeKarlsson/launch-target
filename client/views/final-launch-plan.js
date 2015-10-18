//  Template.finalLaunchPlan.helpers({
//   allFinalTargets : function () {
//     // console.log(Session.get('allTargets'));
//     return Session.get('allTargets');
//   },
// });

//     //Error checking to check for status of query
//     function callback(results, status) {
//       if (status === google.maps.places.PlacesServiceStatus.OK) {
//         var targets = results.map(function (target) {
//           createMarker(target);
//           var targetDetail = {
//             name : target.name,
//             placeId : target.place_id,
//             include : false
//           };
//           return targetDetail;
//         });
//         Session.set('allTargets', targets);
//       }
//     }