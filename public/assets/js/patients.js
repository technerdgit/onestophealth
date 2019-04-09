$(document).ready(function() {
    $(document).on("click", "#patientInfo", displayPatientInfo);
        function displayPatientInfo () {

        console.log("Click llistener!")

        var pInfo = {
            patient_name: $(".patient-first-name")+ $(".patient-last-name"),
            patient_primary_address1: $(".patient-address1"),
            patientId,
        };
        // console.log(pInfo);
        // $.ajax("/api/patientsinfo/" + patientId, {
        //     type: "GET",
        //     success: function(result) {
        //         alert('ok');
        //       },
        //       error: function(result) {
        //         alert('error');
        //       }
        // })
        // .then (
        //     function(response){
        //     })
        //   ;
}});
;

