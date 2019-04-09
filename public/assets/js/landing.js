
$(function(){
	$(".patient-register").on("click", function(){
		var newPatient = {
			patient_name: $(".patient-first-name").val().trim() + " " + $(".patient-last-name").val().trim(),
			patient_primary_address1: $(".patient-address1").val().trim(),
			// patient_primary_address2: $(".patient-address2").val().trim(),
			patient_city: $(".patient-city").val().trim(),
			patient_zip: $(".patient-zip").val().trim(),
			patient_login_name: $(".patient-username").val().trim(),
			patient_login_password: $(".patient-password").val(),
			patient_medical_insurance_id: $(".patient-medical-insurance-id").val().trim(),
			patient_dental_insurance_id: $(".patient-dental-insurance-id").val().trim(),
			patient_medical_provider_id: $(".patient-medical-provider-id").val(),
			patient_dental_provider_id: $(".patient-dental-provider-id").val()
		};
		console.log(newPatient);
		$.ajax("api/patients", {
			type: "POST",
			data: newPatient
	}).then(
	function(){
		res.redirect("/");
	});
  });

// $(document).ready(function(){
	$(".doctor-register").on("click", function() {
		var newDoctor = {
			doctor_name: $(".doctor-first-name").val().trim() + " " + $(".doctor-last-name").val().trim(),
			doctor_primary_address1: $(".doctor-address1").val().trim(),
			// doctor_primary_address2: $(".doctor-address2").val().trim(),
			doctor_city: $(".doctor-city").val().trim(),
			doctor_zip: $(".doctor-zip").val().trim(),
			doctor_specialization: $(".doctor-specialization").val(),
			doctor_login_name: $(".doctor-login-name").val().trim(),
			doctor_login_password: $(".doctor-login-password").val()
		};
		console.log(newDoctor);

		$.ajax("api/doctors", {
			type: "POST",
			data: newDoctor
	}).then(
	function(){
		res.redirect("/");
	});
  });
});
