/* ============================================================
   Registration form -> email (mailto)
   No backend, no API keys. When the visitor submits, their email
   app opens with the registration details pre-filled, addressed
   to the school. They just press "Send".
   ============================================================ */

$(function () {
  "use strict";

  // ------------------------------------------------------------
  // CHANGE THIS to the church / school email address that should
  // receive registrations. This is the only setting you need.
  // ------------------------------------------------------------
  var RECIPIENT_EMAIL = "registrations@example.com";

  var $status = $("#formStatus");

  function setStatus(message, type) {
    $status.removeClass("is-error is-success");
    if (type) { $status.addClass(type); }
    $status.text(message || "");
  }

  $("#registrationForm").on("submit", function (event) {
    event.preventDefault();

    var data = {
      "Name / ስም":            $("#inputFirstName").val().trim(),
      "Last Name / የአያት ስም":  $("#inputLastName").val().trim(),
      "Age / እድሜ":            $("#inputAge").val().trim(),
      "Address / አድራሻ":       $("#inputAddress").val().trim(),
      "City / ከተማ":           $("#inputCity").val().trim(),
      "Parent E-mail / ኢ-ሜል": $("#inputEmail").val().trim()
    };

    // Basic validation
    if (!data["Name / ስም"] || !data["Last Name / የአያት ስም"] || !data["Parent E-mail / ኢ-ሜል"]) {
      setStatus("Please fill in name and email. / እባክዎ ስምና ኢ-ሜል ይሙሉ።", "is-error");
      return;
    }

    // Build the email
    var childName = (data["Name / ስም"] + " " + data["Last Name / የአያት ስም"]).trim();
    var subject = "New Sunday School Registration — " + childName;
    var body = "New registration / አዲስ ምዝገባ\n" +
               "--------------------------------\n";
    Object.keys(data).forEach(function (label) {
      body += label + ": " + (data[label] || "-") + "\n";
    });

    var mailto = "mailto:" + encodeURIComponent(RECIPIENT_EMAIL) +
                 "?subject=" + encodeURIComponent(subject) +
                 "&body=" + encodeURIComponent(body);

    // Open the visitor's email app
    window.location.href = mailto;

    setStatus("Opening your email app… please press Send. / የኢሜል መተግበሪያዎ እየተከፈተ ነው፤ Send ይጫኑ።", "is-success");
    this.reset();
  });

});
