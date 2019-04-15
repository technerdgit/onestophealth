
$(document).ready(function() {
// on click listener for declining patient 
$(document).on("click", ".decline-patient", declineDeclinePatient);
// decline patient function
function declineDeclinePatient(){
  
    alert("pressed decline button" + JSON.stringify($(this).children("new-patient-request")));
    var patientId = $(this).data("patientId");
    var doctorId = $(this).data("doctorId");

    var updatePatient = {
      // update patient fields
        patient_request: false,
        patientId: patientId,
        doctorId: doctorId,
        patient_declined: true
      };
      alert(doctorId);
     $.ajax("/api/patient_doctors/" + doctorId   , {
      // ajax put request for updating patient in RDBMS
         type: "PUT",
         data: updatePatient
    })
      .then(function() {
        // reloads page after promise
        location.reload();
      });

  };
});