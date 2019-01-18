
  var config = {
    apiKey: "AIzaSyAfWoTMK6irqaQQFWMlzfTfxHT6RyrEPKE",
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
 //    // this is listed out each register information


   // Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyAfWoTMK6irqaQQFWMlzfTfxHT6RyrEPKE",
  //   authDomain: "registration-c0803.firebaseapp.com",
  //   databaseURL: "https://registration-c0803.firebaseio.com",
  //   projectId: "registration-c0803",
  //   storageBucket: "",
  //   messagingSenderId: "800851598663"
  // };
  // firebase.initializeApp(config);

  //  // reference messages collection
  //  var registrationInfo = firbase.database().ref('registration');
  // //Listen for form submit
  // document.getElementById('registration').addEventListener('submit', submitForm);
  //  // submit form
  // function submitForm(e) {
  //   e.preventDefault();

  //      // Get Values

  //    var firstName = getInputVal('firstName');
  //    var lastName = getInputVal('lastName');
  //    var age = getInputVal('age');
  //    var address = getInputVal('address');
  //    var zipCode = getInputVal('zipCode');
  //    var email = getInputVal('email');
  //    // save message
  //    studentInfo(firstName, lastName,age,address,zipCode,email);

  // }
  // // function to get form values
  // function getInputVal(id){
  //   return document.getElementById(id).value;
  // }

  // //save registration to firebase

  // function studentInfo(firstName, lastName,age,address,zipCode,email){
  //   var newRegistrationRef = registrationInfo.push();
  //   newRegistrationRef.set({
  //      inputFirstName:inputFirstName,
  //       inputLastName:inputLastName,
  //       inputAge:inputAge,
  //       inputAddress:inputAddress,
  //       inputZipCode:inputZipCode,
  //       inputEmail:inputEmail
  //   });
  // }
