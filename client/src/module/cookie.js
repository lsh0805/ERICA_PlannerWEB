import axios from 'axios';

// 쿠키 값 가져옴
export function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  let loginData = undefined;
  if (parts.length === 2)
    loginData = JSON.parse(atob(parts.pop().split(";").shift()));
  console.log(parts.pop().split(";").shift());
  return loginData;
}
export const NOT_LOGIN = 0;
export const INVALID_SESSION = -1;
export const VALID_SESSION = 1;

export function setCookie(isLoggedIn, email){
  let loginData = {
    isLoggedIn,
    email
  };
  document.cookie = 'key=' + btoa(JSON.stringify(loginData));
}

export async function checkValidSession() {
  // 쿠키로 로그인 정보 가져옴
  let loginData = getCookie('key');
  
  // 로그인 정보가 없을 시 종료
  if(typeof loginData === "undefined"){ console.log(2); return NOT_LOGIN; }

  // 로그인 하지 않았다면 종료.
  if(!loginData.isLoggedIn){ console.log(3); return NOT_LOGIN; }
  let result = INVALID_SESSION;
  // 쿠키 값이 유효한지 판단함.
  await axios.get('/api/account/getInfo')
  .then(() => {console.log(5); result = VALID_SESSION;})
  .catch((err) => { result = INVALID_SESSION; });
  return result;
}

