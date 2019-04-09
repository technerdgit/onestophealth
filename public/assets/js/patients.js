$(document).ready(function() {
    $(document).on("click", "#patientInfo", viewPatientInfo);
})

function viewPatientInfo () {
    var patientNames = $(this).data("patientNames");
    var patientsAddress = $(this).data("patientsAddress");

    var pInfo = {
        patientNames = patientNames,
        patientsAddress = patientsAddress
    };

    $.ajax("/api/patients/" + patientId   , {
        type: "GET",
        data: pInfo
    
    })
}
