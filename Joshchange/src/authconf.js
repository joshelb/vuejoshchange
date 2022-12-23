
import auth0 from 'auth0-js';

var auth = new auth0.WebAuth({
  domain: 'dev-q7xsxw5kc72jd045.eu.auth0.com',
  clientID: '5Q7CfqbZ5QBWpzLsFyZTqsxW6lpsA4se',
  redirectUri: "http://localhost:5173/callback",
	audience: "http://localhost:8080/orderbook/btcusd",
	responseType: 'token id_token'
});

export default auth;
function setSession(authResult) {
    var expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
}

function isAuthenticated() {
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
}
