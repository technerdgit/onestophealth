$(document).ready(function(){
	$(.patient-register).on("click", function(){
		var newPatient = {
			patient_name: $("#patient-first-name").val().trim() + " " + $("#patient-last-name").val().trim(),
			patient_address1: $("#patient-address1").val().trim(),
			patient_address2: $("#patient-address2").val().trim(),
			patient_city: $("#patient-city").val().trim(),
			patient_zip: $("#patient-zip").val().trim(),
			patient_login_name: $("#patient-username").val().trim(),
			patient_login_password: $("#patient-password").val().trim(),
			patient_insurance_provider_id: ("#patient-insurance-provider-id").val().trim(),
			patient_dental_provider_id: ("#patient-dental-provider-id").val().trim()
		};
		console.log(newPatient);
		$.ajax("api/patients",
			type: "POST",
			data: newPatient)
	}).then(function(){
		res.redirect("/");
	}
});


$(document).ready(function(){
	$(.doctor-register).on("click", function() {
		var newDoctor = {
			doctor_name: $("#doctor-first-name").val().trim() + " " + $("#doctor-last-name").val().trim(),
			doctor_address1: $("#doctor-address1").val().trim(),
			doctor_address2: $("#doctor-address2").val().trim(),
			doctor_city: $("#doctor-city").val().trim(),
			doctor_zip: $("#doctor-zip").val().trim(),
			doctor_specialization: $("#doctor-specialization").val().trim(),
			doctor_login_name: $("#doctor-login-name").val().trim(),
			doctor_password: $("doctor-password").val().trim()
		};
		console.log(newDoctor);
		$.ajax("api/doctors",
			type: "POST",
			data: newDoctor)
	}).then(function(){
		res.redirect("/");
	})
});

