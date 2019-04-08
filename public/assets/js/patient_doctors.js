$(document).ready(function() {
    /* global moment */
  
    // blogContainer holds all of our posts
    // var blogContainer = $(".blog-container");
    // var postCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(".decline-patient").on("click", function(){ 
    //$(document).on("click", "decline-patient", declineDeclinePatient);

        
        var patientId = $(this).data("patientId");
        var doctorId = $(this).data("doctorId");
        alert("pressed decline button" + patientId, doctorId);
        var updatePatient = {
            patient_request: false,
            patientId: patientId,
            doctorId: doctorId,
            patient_declined: true
          };
         $.ajax("/api/patient_doctors/" + patientId , {
             type: "PUT",
             data: updatePatient
        })
          .then(function() {
            location.reload();
          });
    
 });
});
    