# NEXT LEVEL

한양대학교 ERICA Open Source Software Project :rocket:  
2019044211 임승현

## 웹 접속
**[NEXT LEVEL 웹 페이지 접속 하기](http://54.180.83.108:3000/)**

## NEXT LEVEL 프로젝트 소개
![로고_이미지](https://github.com/lolmc00/ERICA_PlannerWEB/blob/master/client/src/img/logo.png)  

&nbsp;**NEXT LEVEL**은 계획 및 일정 관리 웹 애플리케이션 입니다.  
&nbsp;자신의 일정이나 목표를 등록하고, 수행하였을 때 경험치를 얻을 수 있습니다. 남들과 경쟁하는 것이 아니기 때문에 경험치량은 직접 설정할 수 있습니다. 기간별로 경험치 추이 그래프를 확인할 수 있어 자신이 얼마나 성장했는지 시각적으로 확인할 수 있습니다.

## 빌드 방법
### 빌드 과정중 오류가 생긴다면 lkaiou2226@naver.com으로 연락주시면 감사하겠습니다.
#### Ubuntu 18.04 환경
1. 자신의 로컬 환경에 레포지토리를 내려받습니다.
2. 터미널창에서 `sudo apt-get update`를 입력해 패키지 리스트를 업데이트 해줍니다.
3. `sudo apt-get install curl`을 입력해 [curl](https://curl.haxx.se/)을 설치합니다.
4. `curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -`를 입력합니다.
5. `sudo apt-get install -y nodejs`를 입력해 [node.js](https://nodejs.org/ko/)를 설치합니다.
6. `sudo apt-get install npm`을 입력해 [npm](https://www.npmjs.com/)을 설치합니다.
7. `sudo apt-get install mysql-server`를 입력해 [mysql](https://www.mysql.com/)을 설치합니다.
8. `sudo mysql -uroot -p`를 입력해 mysql에 접속합니다.
9. `CREATE DATABASE db이름 CHARACTER SET euckr COLLATE euckr_korean_ci;`을 입력해 DB를 생성합니다.
10. `CREATE USER 'db유저이름'@'localhost' IDENTIFIED BY 'db비밀번호'`를 입력하여 유저를 생성합니다.
11. `GRANT ALL PRIVILEGES ON db이름.* to db유저이름@localhost;`를 입력해 db 권한을 부여합니다.
12. `FLUSH PRIVILEGES`를 입력해 유저 변경사항을 업데이트합니다.
13. `exit`를 입력해 mysql에서 빠져나옵니다.
14. 디렉토리 (`./server`)에서 `sudo mkdir config`를 입력해 config 디렉토리를 생성합니다.
15. 디렉토리 (`./server/config`)에서 (`config.json`)을 생성하고 [config.json 형식](https://github.com/lolmc00/ERICA_PlannerWEB/blob/master/server/config/configForm.json)의 내용을 복사하여 붙여넣은 뒤 **수정이 필요하다고 쓰여있는 곳을 수정**해주세요. **(DB 이름은 위에 9번에서 DB를 생성할 때 입력한 db이름을 적어주세요.)**
16. 디렉토리 (`./server/config`)에서 (`session.json`)을 생성하고 [session.json 형식](https://github.com/lolmc00/ERICA_PlannerWEB/blob/master/server/config/sessionForm.json)의 내용을 복사하여 붙여넣은 뒤 **수정이 필요하다고 쓰여있는 곳을 수정**해주세요.
17. 디렉토리 (`./server/config`)에서 (`email.json`)을 생성하고 [email.json 형식](https://github.com/lolmc00/ERICA_PlannerWEB/blob/master/server/config/emailForm.json)의 내용을 복사하여 붙여넣은 뒤 **수정이 필요하다고 쓰여있는 곳을 수정**해주세요.
18. 외부 접속을 허용했을 경우에는 디렉토리 (`./server/config`)에 있는 (`clientAddress.json`)에 localhost 부분을 외부 접속용 IP로 수정해주세요.
19. 디렉토리 (`./server`)에서 `sudo npm install`을 입력하여 서버에 필요한 패키지들을 설치합니다.
20. 디렉토리 (`./client`)에서 `sudo npm install`을 입력하여 클라이언트에 필요한 패키지들을 설치합니다.
21. `sudo npm install -g nodemon`을 입력해 [nodemon](https://nodemon.io/)을 설치합니다.
22. 웹 사용자들이 회원가입, 비밀번호 초기화시 인증 메일을 보내기 위해서 17번에서 등록한 구글 계정으로 로그인하여 https://myaccount.google.com/lesssecureapps 에 접속해 보안 수준이 낮은 앱을 허용합니다.
23. 디렉토리 (`./server`)에서 `sudo npm run-script dev`를 입력하여 클라이언트와 서버를 동시에 가동시킵니다.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
