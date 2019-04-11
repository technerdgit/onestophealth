$(document).ready(function(){
  var signInWidgetConfig ={
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
    registration: true,                
    rememberMe: true,         
    router: true,
  },
   
    baseUrl: 'https://dev-527021.okta.com',
    clientId: '0oafzij4dl6bUC13R356',
    redirectUri: 'http://localhost:8080/implicit/callback',
  authParams: {
      issuer: "https://dev-527021.okta.com/oauth2/default",
      responseType: ["token", "id_token"],
      scopes: ['openid', 'email', 'profile'],
     display: "page"
  },
    // baseUrl: "https://dev-527021.okta.com",
    // clientId: "0oafzij4dl6bUC13R356",
    // authParams: {
    //   issuer: "https://dev-527021.okta.com/oauth2/default",
    //   responseType: ["token", "id_token"],
    //   display: "page"
    // }
  };

  var oktaSignIn = new OktaSignIn(signInWidgetConfig);
  function widgetSuccessCallback(res) {
  if (oktaSignIn.token.hasTokensInUrl()) {
    oktaSignIn.token.parseTokensFromUrl(
      // If we get here, the user just logged in.
      function success(res) {
        var accessToken = res[0];
        var idToken = res[1]
        var key = '';
        if (res[0]) {
          key = Object.keys(res[0])[0];
          alert(key);
          oktaSignIn.tokenManager.add(key, res[0]);
        }
        if (res[1]) {
          key = Object.keys(res[1])[0];
          alert("res1" , key);
          oktaSignIn.tokenManager.add(key, res[1]);
        }

        oktaSignIn.tokenManager.add("accessToken", accessToken);
        oktaSignIn.tokenManager.add("idToken", idToken);
    
    });
            
    $.ajax("/api/patient/" + idToken.claims.email, {
      method: "GET",
      headers: {
       Authorization: 'Bearer ' + token.accessToken
     },
     success: function (response) {
       // Received messages!
      // console.log('Messages', response);
      console.log(window.localStorage.getItem());
     },
     error: function (response) {
       console.error(response);
     }
   })
     .then(function (response) {
       
       parent.window.location="/api/patient/"+ idToken.claims.email;
     });
      function error(err) {
        console.error(err);
      };
  } else {
    oktaSignIn.session.get(function (res) {
      // If we get here, the user is already signed in.
      if (res.status === 'ACTIVE') {
        parent.window.location="/api/patient/"+ idToken.claims.email;
      }
    });
  }
}

function widgetErrorCallback (err) {
}

      // If we get here, the user is not logged in, so we should show the sign-in form.
 oktaSignIn.renderEl({ el: '#widget-container' },widgetSuccessCallback, widgetErrorCallback );
});