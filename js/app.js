/* ============================================================
   Registration form -> Firebase Realtime Database
   Fails gracefully if Firebase config/API key is not present,
   so the rest of the site keeps working.
   ============================================================ */

$(function () {
  "use strict";

  // Firebase config. Provide "apiKey" here to enable submissions.
  // (The apiKey is intentionally omitted from source control.)
  var config = {
    // apiKey: "YOUR_API_KEY",
    authDomain:        "registration-c0803.firebaseapp.com",
    databaseURL:       "https://registration-c0803.firebaseio.com",
    projectId:         "registration-c0803",
    storageBucket:     "registration-c0803.appspot.com",
    messagingSenderId: "800851598663"
  };

  var $status  = $("#formStatus");
  var database = null;
  var firebaseReady = false;

  // Initialise Firebase only when it is available AND configured.
  if (typeof firebase !== "undefined" && config.apiKey) {
    try {
      firebase.initializeApp(config);
      database = firebase.database();
      firebaseReady = true;
    } catch (err) {
      console.warn("Firebase failed to initialise:", err);
    }
  } else {
    console.info("Firebase not configured — registration submissions are disabled.");
  }

  function setStatus(message, type) {
    $status.removeClass("is-error is-success");
    if (type) { $status.addClass(type); }
    $status.text(message || "");
  }

  // Handle form submission
  $("#registrationForm").on("submit", function (event) {
    event.preventDefault();

    var student = {
      firstName: $("#inputFirstName").val().trim(),
      lastName:  $("#inputLastName").val().trim(),
      age:       $("#inputAge").val().trim(),
      address:   $("#inputAddress").val().trim(),
      city:      $("#inputCity").val().trim(),
      email:     $("#inputEmail").val().trim()
    };

    if (!student.firstName || !student.lastName || !student.email) {
      setStatus("Please fill in name and email. / እባክዎ ስምና ኢ-ሜል ይሙሉ።", "is-error");
      return;
    }

    if (!firebaseReady) {
      setStatus("Registration is temporarily unavailable. Please call us. / ምዝገባ ለጊዜው አይሰራም፤ ይደውሉልን።", "is-error");
      return;
    }

    student.dateAdded = firebase.database.ServerValue.TIMESTAMP;

    database.ref("students").push(student)
      .then(function () {
        setStatus("Thank you! Registration received. / እናመሰግናለን! ተመዝግቧል።", "is-success");
        $("#registrationForm")[0].reset();
      })
      .catch(function (err) {
        console.error(err);
        setStatus("Something went wrong. Please try again. / ችግር ተፈጥሯል፤ እባክዎ እንደገና ይሞክሩ።", "is-error");
      });
  });

  // Show the most recently added student
  if (firebaseReady) {
    database.ref("students").orderByChild("dateAdded").limitToLast(1)
      .on("child_added", function (snapshot) {
        var s = snapshot.val() || {};
        $("#firstNameDisplay").text(s.firstName || "");
        $("#lastNameDisplay").text(s.lastName || "");
        $("#ageDisplay").text(s.age || "");
        $("#addressDisplay").text(s.address || "");
        $("#cityDisplay").text(s.city || "");
        $("#emailDisplay").text(s.email || "");
      });
  }

});
