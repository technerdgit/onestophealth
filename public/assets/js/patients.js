// Enable Disable the Field for editing in the Patient dashboard


$(document).ready(function () {
    $("#doctor_search").on("click", function () {
        var userInput = $("#searchDoctorZip").val().trim();
        console.log(userInput);
        // Get doctor zips from collected database 
        $.ajax({
            // Project.findAll({ where: { name: 'doctor_zip' } }).then(projects => {
            type: "GET",
            url: "/api/patient/doctor_zip/" + userInput,
            success: function (res) {

            }
        }).then(function (response) {

            location.reload();
            // location.reload();
            console.log("frontend", response);

        });
    });
});



