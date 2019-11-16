import axios from 'axios';
// 쿠키 값 가져옴
export function getCookie(name) {
  console.log(document.cookie);
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}
export const NOT_LOGIN = 0;
export const INVALID_SESSION = -1;
export const VALID_SESSION = 1;

export async function checkValidSession() {
  // 쿠키로 로그인 정보 가져옴
  let loginData = getCookie('key');
  
  // 로그인 정보가 없을 시 종료
  if(typeof loginData === "undefined"){ console.log(2); return NOT_LOGIN; }

  // 로그인 데이터를 base64로 디코딩하고 JSON으로 parse
  loginData = JSON.parse(atob(loginData));
  // 로그인 하지 않았다면 종료.
  if(!loginData.isLoggedIn){ console.log(3); return NOT_LOGIN; }
  let result = INVALID_SESSION;
  // 쿠키 값이 유효한지 판단함.
  await axios.get('/api/account/getInfo')
  .then(() => {console.log(5); result = VALID_SESSION;})
  .catch((err) => { result = INVALID_SESSION; });
  return result;
}

