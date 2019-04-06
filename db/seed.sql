use onestophealth;

insert into doctor (doctor_name,doctor_address1,doctor_city,doctor_state,doctor_zip,doctor_specilization,doctor_login_name,doctor_password)
values("John C","1500 De Anza Blvd","Cupertino","CA","95050","General","johnc","test123ABC");

insert into insurance_providers(provider_name,provider_type) values("Aetna","Medical");
insert into insurance_providers(provider_name,provider_type) values("Blue Cross","Medical");
insert into insurance_providers(provider_name,provider_type) values("Delta","Dental");
insert into insurance_providers(provider_name,provider_type) values("Aetna","Dental");

insert into patient ( patient_name,patient_address1,patient_city,patient_state,patient_zip,patient_insurance_provider_id,
patient_dental_provider_id, patient_insurance_id,patient_dental_insurance_id,patient_login_name,patient_login_password)
values("John Doe","Disney Land Blvd","Los Angeles","CA","93000","1","3","1323234234","110011123","johnd","disney123Test");

insert into doctor_insurance_accepted(doctor_id,insurance_accepted_id) values(1,1);

insert into patient_doctors(patient_id,doctor_id,current_doctor) values(1,1,true);

insert into patient_records(doctor_id,patient_id,record) values(1,1,"Got my flu shot");