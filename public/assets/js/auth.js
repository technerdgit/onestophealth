  var signInWidgetConfig = {

    // Enable or disable widget functionality with the following options. Some of these features require additional configuration in your Okta admin settings. Detailed information can be found here: https://github.com/okta/okta-signin-widget#okta-sign-in-widget
    // Look and feel changes:
    logo: '/assets/images/logo-removebg.png', // Try changing "okta.com" to other domains, like: "workday.com", "splunk.com", or "delmonte.com"
    language: 'en',                       // Try: [fr, de, es, ja, zh-CN] Full list: https://github.com/okta/okta-signin-widget#language-and-text
    i18n: {
      //Overrides default text when using English. Override other languages by adding additional sections.
      'en': {
        'primaryauth.title': 'Sign In',   // Changes the sign in text
        'primaryauth.submit': 'Sign In',  // Changes the sign in button
        // More e.g. [primaryauth.username.placeholder,  primaryauth.password.placeholder, needhelp, etc.].
        // Full list here: https://github.com/okta/okta-signin-widget/blob/master/packages/@okta/i18n/dist/properties/login.properties
      }
    },
    // Changes to widget functionality
    features: {
      registration: true,                 // Enable self-service registration flow
      rememberMe: true,                   // Setting to false will remove the checkbox to save username
      //multiOptionalFactorEnroll: true,  // Allow users to enroll in multiple optional factors before finishing the authentication flow.
      //selfServiceUnlock: true,          // Will enable unlock in addition to forgotten password
      //smsRecovery: true,                // Enable SMS-based account recovery
      //callRecovery: true,               // Enable voice call-based account recovery
      //router: true,                       // Leave this set to true for the API demo
    },
    baseUrl: 'https://dev-527021.okta.com',
    clientId: '0oag64guprhST0dvU356',
    redirectUri: 'http://localhost:8080',
    authParams: {
      issuer: "https://dev-527021.okta.com/oauth2/default",
      responseType: ['token', 'id_token'],
      scopes: ['openid', 'email', 'profile'],
    },
  };


  signInWidget = new OktaSignIn(signInWidgetConfig);


  function widgetSuccessCallback(res) {
    var key = '';
    res0 = res[0];
    res1 = res[1];
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
      // var token = signInWidget.tokenManager.get(key);
      // var accessToken = signInWidget.tokenManager.get("accessToken");

      $.ajax("/api/doctors/" + res[1].claims.email, {
        type: "GET",
        headers: {
          Authorization: 'Bearer ' + accessToken
        },
        success: function (response) {
          // Received messages!
          // console.log('Messages', response);
          //console.log(window.localStorage.getItem());
        },
        error: function (response) {
          console.error(response);
        }
      }).then(function (response) {
        //  location.reload();
        parent.window.location = "/api/doctors/" + res[1].claims.email;
      });
    }
  }

  var patientSignInWidgetConfig = {

    // Enable or disable widget functionality with the following options. Some of these features require additional configuration in your Okta admin settings. Detailed information can be found here: https://github.com/okta/okta-signin-widget#okta-sign-in-widget
    // Look and feel changes:
    logo: '/assets/images/logo-removebg.png', // Try changing "okta.com" to other domains, like: "workday.com", "splunk.com", or "delmonte.com"
    language: 'en',                       // Try: [fr, de, es, ja, zh-CN] Full list: https://github.com/okta/okta-signin-widget#language-and-text
    i18n: {
      //Overrides default text when using English. Override other languages by adding additional sections.
      'en': {
        'primaryauth.title': 'Sign In',   // Changes the sign in text
        'primaryauth.submit': 'Sign In',  // Changes the sign in button
        // More e.g. [primaryauth.username.placeholder,  primaryauth.password.placeholder, needhelp, etc.].
        // Full list here: https://github.com/okta/okta-signin-widget/blob/master/packages/@okta/i18n/dist/properties/login.properties
      }
    },
    // Changes to widget functionality
    features: {
      registration: true,                 // Enable self-service registration flow
      rememberMe: true,                   // Setting to false will remove the checkbox to save username
      //multiOptionalFactorEnroll: true,  // Allow users to enroll in multiple optional factors before finishing the authentication flow.
      //selfServiceUnlock: true,          // Will enable unlock in addition to forgotten password
      //smsRecovery: true,                // Enable SMS-based account recovery
      //callRecovery: true,               // Enable voice call-based account recovery
      //router: true,                       // Leave this set to true for the API demo
    },
    baseUrl: 'https://dev-527021.okta.com',
    clientId: "0oafzij4dl6bUC13R356",
    redirectUri: 'http://localhost:8080',
    authParams: {
      issuer: "https://dev-527021.okta.com/oauth2/default",
      //  aud: "api://default",
      responseType: ['token', 'id_token'],
      scopes: ['openid', 'email', 'profile'],
    },
  };
  patientSignInWidget = new OktaSignIn(patientSignInWidgetConfig);

  function patientWidgetSuccessCallback(res) {
    var key = '';
    res0 = res[0];
    res1 = res[1];
    if (res[0]) {
      key = Object.keys(res[0])[0];
      console.log(key, res[0][0]);
      patientSignInWidget.tokenManager.add(key, res[0]);
    }
    if (res[1]) {
      key = Object.keys(res[1])[0];
      patientSignInWidget.tokenManager.add(key, res[1]);
    }
    patientAccessToken = patientSignInWidget.tokenManager.get("accessToken");

    if (!patientAccessToken) {
      return;
    }
    if (res.status === 'SUCCESS') {
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


  function widgetErrorCallback(err) {
    console.log(err);
  }

  function logout() {
    console.log("logout pressed");
    oktaSignIn.signOut("/");
    self.location = "landing";
  }

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