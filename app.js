
  var config = {
   
    authDomain: "registration-c0803.firebaseapp.com",
    databaseURL: "https://registration-c0803.firebaseio.com",
    projectId: "registration-c0803",
    storageBucket: "registration-c0803.appspot.com",
    messagingSenderId: "800851598663"
  };

  firebase.initializeApp(config);

   // create a variable to reference a database
   var database = firebase.database();

  // variable setup
      var firstName= "";
      var lastName= "";
      var Age= 0;
      var Address= "";
      var city ="";
      // var ZipCode= "";
      var email="";

      // where a user click the submit
  $("#addUser").on("click", function(event){
    event.preventDefault();
      	// get the input values
       firstName = $("#inputFirstName").val().trim();
       lastName = $("#inputLastName").val().trim();
       age = $("#inputAge").val().trim();
       address = $("#inputAddress").val().trim();
       city= $("#inputCity").val().trim();
       // zipCode = $("#inputZipCode").val().trim();
       email = $("#inputEmail").val().trim();
      
       //firebase.database().ref().set({
    var summerStudent = {
        firstName:firstName,
        lastName:lastName,
        age:age,
        address:address,
        city:city,
        // zipCode:zipCode,
        email:email,
        dateAdded:firebase.database.ServerValue.TIMESTAMP
      };
       	
	
   	//});   
    database.ref().push(summerStudent);
      $("#firstNameInput").val("");
      $("#lastNameInput").val("");
      $("#ageInput").val("");
      $("#addressInput").val("");
      $("#cityInput").val("");
      // $("#zipCodeInput").val("");
       $("#emailInput").val("");
  });
    
 //    //firebase.database().ref().on("value", function(snapshot){
    firebase.database().ref().on("child_added", function(snapshot){
     	$(".theList").append("<p>"+snapshot.val().firstName+"</p>");
     	$(".theList").append("<p>"+snapshot.val().lastName+"</p>");
     	$(".theList").append("<p>"+snapshot.val().age+"</p>");
     	$(".theList").append("<p>"+snapshot.val().address+"</p>");
      $(".theList").append("<p>"+snapshot.val().city+"</p>");
     	// $(".theList").append("<p>"+snapshot.val().zipCode+"</p>");
     	$(".theList").append("<p>"+snapshot.val().email+"</p>");
     	$(".theList").append("/hr");
     });

   firebase.database().ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
 // firebase.database().ref().on("value", function(snapshot){ 
    $("#firstNameDisplay").html(snapshot.val().firstName);
    $("#lastNameDisplay").html(snapshot.val().lastName);
    $("#ageDisplay").html(snapshot.val().age);
    $("#addressDisplay").html(snapshot.val().address);
     $("#cityDisplay").html(snapshot.val().city);
    // $("#zipCodeDisplay").html(snapshot.val().zipCode);
    $("#emailDisplay").html(snapshot.val().email);
    
    console.log(snapshot.val());
  
});
 
