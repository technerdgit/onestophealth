$(document).ready(function() {
/* global moment */

// blogContainer holds all of our posts
// var blogContainer = $(".blog-container");
// var postCategorySelect = $("#category");
// Click events for the edit and delete buttons
//   $(".decline-patient").on("click", function(events){ 
$(document).on("click", ".decline-patient", declineDeclinePatient);

function declineDeclinePatient(){
  
    alert("pressed decline button" + JSON.stringify($(this).children("new-patient-request")));
    var patientId = $(this).data("patientId");
    var doctorId = $(this).data("doctorId");

    var updatePatient = {
        patient_request: false,
        patientId: patientId,
        doctorId: doctorId,
        patient_declined: true
      };
      alert(doctorId);
     $.ajax("/api/patient_doctors/" + doctorId   , {
         type: "PUT",
         data: updatePatient
    })
      .then(function() {
        location.reload();
      });

  };
});