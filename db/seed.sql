create database onestophealth;
use onestophealth;

insert into doctors (doctor_name,doctor_primary_address1,doctor_city,doctor_state,doctor_zip,doctor_specilization,doctor_login_name,doctor_login_password,doctor_type,createdAt,updatedAt,email)
values("John C","1500 De Anza Blvd","Cupertino","CA","95050","General","johnc","test123ABC",'Medical', now(), now(),"kanwar@gmail.com");

insert into doctors (doctor_name,doctor_primary_address1,doctor_city,doctor_state,doctor_zip,doctor_specilization,doctor_login_name,doctor_login_password,doctor_type,createdAt,updatedAt,email)
values("Calvin C","100 Pearl Dr","San Jose","CA","95135","Dentist","calvin","test123ABC",'Dentist', now(), now(), "calvin.r.chau@gmail.com");



insert into insurance_providers(provider_name,provider_type,createdAt,updatedAt) values("Aetna","Medical",now(),now());
insert into insurance_providers(provider_name,provider_type,createdAt,updatedAt) values("Blue Cross","Medical",now(),now());
insert into insurance_providers(provider_name,provider_type,createdAt,updatedAt) values("Delta","Dental", now(),now());
insert into insurance_providers(provider_name,provider_type,createdAt,updatedAt) values("Aetna","Dental",now(),now());

insert into patients( patient_name,patient_primary_address1,patient_city,patient_state,patient_zip,patient_medical_provider_id,
patient_dental_provider_id, patient_medical_insurance_id,patient_dental_insurance_id,patient_login_name,patient_login_password,createdAt,updatedAt,email)
values("John Doe","Disney Land Blvd","Los Angeles","CA","93000","1","3","1323234234","110011123","johnd","disney123Test",now(),now(),"electronic62794@yahoo.com");

insert into patients( patient_name,patient_primary_address1,patient_city,patient_state,patient_zip,patient_medical_provider_id,
patient_dental_provider_id, patient_medical_insurance_id,patient_dental_insurance_id,patient_login_name,patient_login_password,createdAt,updatedAt,email)
values("Andrew","Universal Studio Blvd","Los Angeles","CA","93100","2","4","1322234234","220011123","arnold","disney123Test",now(),now(), "kanwar@gmail.com");

insert into patients( patient_name,patient_primary_address1,patient_city,patient_state,patient_zip,patient_medical_provider_id,
patient_dental_provider_id, patient_medical_insurance_id,patient_dental_insurance_id,patient_login_name,patient_login_password,createdAt,updatedAt,email)
values("Kanwar","Dark side Blvd","Los Angeles","CA","93110","2","4","322234234","30011123","Voldi" ,"sney123Test",now(),now(),"xie.andrew2235@gmail.com");



-- insert into doctor_insurance_accepted(doctor_id,insurance_accepted_id) values(1,1);

insert into patient_doctors(patientId,doctorId,current_patient,createdAt,updatedAt) values(1,1,true,now(),now());
insert into patient_doctors(patientId,doctorId,current_patient,createdAt,updatedAt) values(2,1,true,now(),now());
insert into patient_doctors(patientId,doctorId,current_patient,createdAt,updatedAt) values(2,2,true,now(),now());

insert into patient_insurances(patientId,insuranceProviderId,createdAt,updatedAt) values(1,2,now(),now());
insert into patient_insurances(patientId,insuranceProviderId,createdAt,updatedAt) values(2,1,now(),now());

insert into doctor_insurances(doctorId,insuranceProviderId,createdAt,updatedAt) values(1,1,now(),now());
insert into doctor_insurances(doctorId,insuranceProviderId,createdAt,updatedAt) values(1,2,now(),now());

SELECT `id`, `patient_name`, `patient_primary_address1`, `patient_primary_address2`, `patient_city`, `patient_state`, `patient_zip`, `patient_medical_provider_id`, `patient_medical_insurance_id`, `patient_dental_provider_id`, `patient_dental_insurance_id`, `patient_login_name`, `patient_login_password`, `createdAt`, `updatedAt` FROM `patients` AS `patients` WHERE `patients`.`id` = '2';


