import apisauce from 'apisauce';

const create = (baseURL = 'http://www.hipercasting.com.br/api/') => {
// const create = (baseURL = 'http://troca.luby.com.br/api/') => {
  var api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'apikey': '',
      'apiPassword': ''
    },
    timeout: 300000
  })
  const register = (first_name, last_name, email, password, password_confirmation) => api.post('user/registration', { first_name : first_name, last_name : last_name, email : email, password : password, password_confirmation : password_confirmation });
  const login = (email, password, pushToken, player_id) => api.post('auth', { email : email, password : password, push_token:pushToken, player_id:player_id });

  const loginFacebook = (first_name, last_name, email, token, pushToken, player_id) => api.post('auth/social', { first_name : first_name, last_name : last_name, email:email, token:token, type:"facebook_token", push_token:pushToken, player_id:player_id });
  const loginGoogle = (first_name, last_name, email, token, pushToken, player_id) => api.post('auth/social', { first_name : first_name, last_name : last_name, email:email, token:token, type:"google_token", push_token:pushToken, player_id:player_id });

  const sendEmailWithToken = (email) => api.post('lost_password', { email : email });
  const resetPassword = (token, password, password_confirmation) => api.post('reset_password', {token : token, password : password, password_confirmation : password_confirmation });
  return {
    register,
    login,
    loginFacebook,
    loginGoogle,
    sendEmailWithToken,
    resetPassword
  }
}
export default {
  create
}
