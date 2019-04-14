var signInWidgetConfig = {

  // Enable or disable widget functionality with the following options. Some of these features require additional configuration in your Okta admin settings. Detailed information can be found here: https://github.com/okta/okta-signin-widget#okta-sign-in-widget
  // Look and feel changes:
  logo: '/assets/images/logo-removebg.png',  // set image to show on Sign In / SignUp Page
  language: 'en',                 // Use langugage as English
  i18n: {
    //Overrides default text when using English. Override other languages by adding additional sections.
    'en': {
      'primaryauth.title': 'Sign In',   // Changes the sign in text
      'primaryauth.submit': 'Sign In',  // Changes the sign in button
    }
  },
  // Changes to widget functionality
  features: {
    registration: true,                 // Enable self-service registration flow
    rememberMe: true,                   // Setting to false will remove the checkbox to save username
    multiOptionalFactorEnroll: true  // Allow users to enroll in multiple optional factors before finishing the authentication flow.
  },
  // Okta Authentication and Authorization Server Details
  baseUrl: 'https://dev-527021.okta.com',
  clientId: '0oag64guprhST0dvU356',
  redirectUri: 'http://localhost:8080',
  authParams: {
    issuer: "https://dev-527021.okta.com/oauth2/default",
    responseType: ['token', 'id_token'],
    scopes: ['onestophealth','openid', 'email', 'profile'],
  },
};

// Create a New SignIn  constructor for Doctors

signInWidget = new OktaSignIn(signInWidgetConfig);

// Function for the Successfull callback for the Widget callback
function widgetSuccessCallback(res) {
  var key = '';
  // res0 = res[0];
  // res1 = res[1];
  if (res[0]) {
    key = Object.keys(res[0])[0];
    console.log(key, res[0][0]);
    signInWidget.tokenManager.add(key, res[0]);
  }
  if (res[1]) {
    key = Object.keys(res[1])[0];
    signInWidget.tokenManager.add(key, res[1]);
  }
  accessToken = signInWidget.tokenManager.get("accessToken");

  if (!accessToken) {
    return;
  }
  if (res.status === 'SUCCESS') {
    // Setup the logic to check if user existins in MySql Database 
    // If not found add to MySql with information stored in Okta using the API call
    var baseUrl = 'https://dev-527021.okta.com';
    $.ajax({
      url: baseUrl + '/api/v1/users/me',
      type: "GET",
      xhrFields: { withCredentials: true },
      accept: 'application/json'
    }).done(function (data) {
      console.log(data);
      // Gather data received from Okta to be sent to MySql
      var oktaData = {
        doctor_name: (data.profile.firstName + " " + data.profile.lastName),
        doctor_primary_address1: data.profile.streetAddress,
        doctor_city: data.profile.locality,
        email: data.profile.email,
        doctor_zip: data.profile.postalCode
      };
      // Invoke MySql Post to API Route /api/doctor

      $.ajax("/api/doctor", {
        method: "POST",
        data: oktaData,
        headers: {
          Authorization: 'Bearer ' + accessToken
        },
        xhrFields: { withCredentials: true },
        accept: 'application/json'
      }).then(function (dbdata) {
        console.log("output of ", dbdata);
        // if (dbdata) {
        parent.window.location = "/api/doctors/" + res[1].claims.email;
        $.ajax("/api/doctors" + dbdata.email, {
          type: "GET",
          headers: {
            Authorization: "Bearer" + AccessToken.accessToken
          },
          xhrFields: { withCredentials: false },
          accept: 'application/json',
          success: function () {
            console.log("Before redirect to web page", dbdata.email, res[1].claims.email)
            parent.window.location = "/api/doctors/" + dbdata.email;
          },
          error: function () {
            console.log("There is an error rendering");
          }
        }).then(function (presp) {
          console.log("I am here")
          parent.window.location = "/api/doctors/" + dbdata.email;
        });
        // }
      });
    });
  }
}

var patientSignInWidgetConfig = {


  logo: '/assets/images/logo-removebg.png', // Our Image for the Login Modal
  language: 'en',                       // Language English
  i18n: {
    //Overrides default text when using English. Override other languages by adding additional sections.
    'en': {
      'primaryauth.title': 'Sign In',   // Changes the sign in text
      'primaryauth.submit': 'Sign In',  // Changes the sign in button
    }
  },
  // Changes to widget functionality
  features: {
    registration: true,                 // Enable self-service registration flow
    rememberMe: true,                   // Setting to false will remove the checkbox to save username
    multiOptionalFactorEnroll: true,  // Allow users to enroll in multiple optional factors before finishing the authentication flow.
  },
  baseUrl: 'https://dev-527021.okta.com',
  clientId: "0oafzij4dl6bUC13R356",
  redirectUri: 'http://localhost:8080',
  authParams: {
    issuer: "https://dev-527021.okta.com/oauth2/default",
    //  aud: "api://default",
    responseType: ['token', 'id_token'],
    scopes: ['onestophealth','openid', 'email', 'profile'],
  },
};

// Invoke OktaSignIn constructor crete a new instance for Patient Widget
patientSignInWidget = new OktaSignIn(patientSignInWidgetConfig);

// Patient Widget for Login Form 
function patientWidgetSuccessCallback(res) {
  var key = '';
  // res0 = res[0];
  // res1 = res[1];
  if (res[0]) {
    key = Object.keys(res[0])[0];
    console.log(key, res[0][0]);
    patientSignInWidget.tokenManager.add(key, res[0]);
  }
  if (res[1]) {
    key = Object.keys(res[1])[0];
    patientSignInWidget.tokenManager.add(key, res[1]);
  }
  // Create a separate Auth token for the Patient
  patientAccessToken = patientSignInWidget.tokenManager.get("accessToken");
 // Verify there is a valid token
  if (!patientAccessToken) {
    return;
  }
  if (res.status === 'SUCCESS') {

    // Get User info using the Okta API via the Authorization Server
    var baseUrl = 'https://dev-527021.okta.com';
    $.ajax({
      url: baseUrl + '/api/v1/users/me',
      type: "GET",
      xhrFields: { withCredentials: true },
      accept: 'application/json'
    }).done(function (data) {
      console.log(data);
      var oktaData = {
        patient_name: (data.profile.firstName + " " + data.profile.lastName),
        patient_primary_address1: data.profile.streetAddress,
        patient_city: data.profile.locality,
        email: data.profile.email,
        patient_zip: data.profile.postalCode
      };
      console.log(oktaData);
      // Send a Post request to database with Okta data for the patient, Lookup up the user
      // if the user exists return patient information else add the recored retrieved from Okta
      // then render the user 
      $.ajax("/api/patient", {
        method: "POST",
        data: oktaData,
        headers: {
          Authorization: 'Bearer ' + patientAccessToken.accessToken
        },
        xhrFields: { withCredentials: true },
        accept: 'application/json'
      }).then(function (dbdata) {
        console.log("output of ", dbdata);
        // if (dbdata) {
        parent.window.location = "/api/patient/" + res[1].claims.email;
        $.ajax("/api/patient" + dbdata.email, {
          type: "GET",
          headers: {
            Authorization: "Bearer" + patientAccessToken.accessToken
          },
          // xhrFields: { withCredentials: false },
          // accept: 'application/json',
          success: function () {
            console.log("Before redirect to web page", dbdata.email, res[1].claims.email)
            parent.window.location = "/api/patient/" + dbdata.email;
          },
          error: function () {
            console.log("There is an error rendering");
          }
        }).then(function (presp) {
          console.log("I am here")
          parent.window.location = "/api/patient/" + dbdata.email;
        });
        // }
      });
    });
  }
}

// If the widget has an error Show the error in console log (Brower Console Log)
function widgetErrorCallback(err) {
  console.log(err);
}

// Check if the user has clicked the Doctor or Patient Login button to invoke the right Login Screen
$(document).ready(function () {

  $("#doctor-login-btn").on("click", function () {
    // Before invoking the signin /signup page remove existing rendering 
    signInWidget.remove();
    patientSignInWidget.remove();
    signInWidget.renderEl({ el: '#doctor-widget-container' }, widgetSuccessCallback, widgetErrorCallback);
  });

  $("#patient-login-btn").on("click", function () {
    // Before invoking the signin /signup page remove existing rendering 
    signInWidget.remove();
    patientSignInWidget.remove();
    patientSignInWidget.renderEl({ el: '#patient-widget-container' }, patientWidgetSuccessCallback, widgetErrorCallback);

  });


});