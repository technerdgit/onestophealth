// $(document).ready(function() {
//     $(document).on("click", "#patientInfo", viewPatientInfo);
// })

// function viewPatientInfo () {
//     var patientNames = $(this).data("patientNames");
//     var patientsAddress = $(this).data("patientsAddress");

//     var pInfo = {
//         patientNames = patientNames,
//         patientsAddress = patientsAddress
//     };

//     $.ajax("/api/patients/" + patientId   , {
//         type: "GET",
//         data: pInfo
    
//     })
// }

$(document).ready(function(){
    $("#doctor_search").on("click", function () {
    var userInput = $("#searchDoctorZip").val().trim();
    console.log(userInput);
// Get doctor zips from collected database 
$.ajax({
    // Project.findAll({ where: { name: 'doctor_zip' } }).then(projects => {
    type: "GET",
    url: "/api/patient/doctor_zip/" + userInput,
    success: function(res) {
       
    }
}).then(function(response){

    location.reload();
    // location.reload();
    console.log("frontend", response);

});
});
});
// Test userInput against doctorZips
// Post to page if userInput === doctorsZips
// $.ajax({
//     type: "POST",
//     url: "/api/patientsinfo",

// }
// }

// router.get('/doctors/:id, function (req, res, next)
//  var sql = 'SELECT * FROM doctors WHERE id = ${req.params.id}';
//  var query = db.query(sql, function(err, result) {
//  if (err) throw (err);
//  console.log(result);
//  var model = {result: result}
//  res.render('doctor_zip'), { doctor_zip: 'Zip Codes', model});
// });
// });
// 