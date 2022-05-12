# SET UP 과정 정리

- [SET UP 과정 정리](#set-up-과정-정리)
  - [1. node.js 설치](#1-nodejs-설치)
    - [1.1 준비](#11-준비)
    - [1.2 NVM 설치](#12-nvm-설치)
    - [1.3 Node.js 설치](#13-nodejs-설치)
  - [2. 초기 세팅 과정](#2-초기-세팅-과정)
  - [3. package.json표](#3-packagejson표)

## 1. node.js 설치

node.js가 설치되어 있다면 해당 단계는 넘어도 좋습니다.

현재 나의 경우 Linux를 사용하고 있어서, nvm을 이용하여 node.js 최신버전을 다운로드했습니다.

### 1.1 준비

대부분 우분투 환경에서 미리 세팅이 되어 있겠지만, 소스코드 빌드가 필요하므로 빌드 환경부터 설치를 해야 합니다.

    $ sudo apt-get install build-essential libssl-dev

### 1.2 NVM 설치

**NVM**은 다음 CLI로 설치가 됩니다.

    $ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

NVM의 Path는 이미 유저 계정의 bash 설정 파일에 들어있습니다. 하지만, 적용이 되어야 하므로 아래와 같이 해줍니다.

    $ source ~/.bashrc

### 1.3 Node.js 설치

Node.js의 홈페이지를 가보면 현재 다운로드할 수 있는 version이 나와있습니다. LTS와 최신 기능이 존재하는데, LTS의 version을 사용하면 됩니다.

> LTS란 Long Term Support의 약자로, 장기간동안 지원합니다는 것을 의미합니다.

현재 가장 최근 LTS 버전이 16.13.1이므로 해당 버전을 설치하면 됩니다.

    $ nvm install 16.13.1

설치가 되어 잘 작동하는지 확인해보는 것은 아래와 같이 하면 됩니다.

    $ node -v
    $ npm -version

## 2. 초기 세팅 과정

프로젝트에 package.json 파일을 만들기 위해 초기화를 시켜줍니다.

    $ npm init

그러면 프로젝트에 관한 정보를 물어보고 json파일을 생성합니다.

> 여기서 json 파일이란 프로그래머가 파일에 정보를 저장하기 위해 만든 방식으로 사용됩니다.

package.json은 아래와 같은 식으로 되어있습니다.

```javascript
{
  "name": "practice",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
  },
  "devDependencies": {
  }
}
```

[package.json](#packagejson표)파일의 내용을 표로 만들어 맨 아래에 설명해 놨습니다.

다음 express를 설치줍니다.

    $ npm i express

이를 통해, node_modules폴더가 생성되고 package-lock.json파일이 생성될 것입니다.

package.json덕분에 필요 없는 모듈은 .gitignore파일에 넣어주어 제외 시켜줍니다.

이후 babel을 설치하여 줍니다.

    $ npm install --save-dev @babel/core @babel/node

> babel이란 자바스크립트 컴파일러로, 새로운 ESNext 문법을 기존의 브라우저가 이해하기 위해선 babel을 사용하여 기존의 문법으로 바꿔주는 과정이 필요합니다.

> --save-dev 같은 경우 package.json에 정보를 넣을떄 devDependencies에 넣어주는 것입니다.

babel 설정 파일을 만들어 줍니다.

    $ touch babel.config.json

이후 babel.config.json에 다음과 같이 해줍니다.

```js
{
    "presets": ["@babel/preset-env"]
}
```

Smart preset인 preset-env를 설치하여 줍니다.

    $ npm instal @babel/preset-env --save-dev

> preset은 babel을 위한 거대한 플러그인이라고 생각하면 됩니다.
> babel이 무엇을 하게 하려면 plugin을 설치해야 하는데 그 중 하나가 preset인 것입니다.

매번 수정할때 마다 일일히 명령어를 써서 실행해주기 보단, 수정하여 저장을 했을 때 서버에서 자동으로 다시 실행해주는 nodemon을 설치하여 줍니다.

    $ npm i nodemon --save-dev

여기까지 셋업이 되었다면, package.json에서 "scripts"부분을 아래와 같이 수정하여 사용할 수 있습니다.

```javascript
  "scripts": {
    "dev": "nodemon --exec babel-node index.js"
  }
```

> 여기서 dev는 아무거나 수정해서 사용해도 됩니다.

> 서버를 실행하려면 npm run dev를 치면 실행히 될 것입니다.

여기까지 하면 서버 구축을 위한 초기 셋업 단계가 마무리 된 것입니다.

## 3. package.json표

| key             | value                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name            | 프로젝트 이름으로, 가장 중요합니다. 중앙 저장소에 배포할 때 version과 함께 필수 항목입니다.                                                                                                                                                                                                                                                                                                                                                              |
| main            | 우리가 만들고 배포한 package를 다른 사람들이 설치하면 main을 사용하게 됩니다.                                                                                                                                                                                                                                                                                                                                                                            |
| version         | 프로젝트 버전을 정의합니다. 3단계 버전을 사용하며, - 로 태그 이름을 적을 수 있습니다.                                                                                                                                                                                                                                                                                                                                                                    |
| description     | 프로젝트 설명으로, 문자열로 기술합니다.<br/>npm search로 검색된 리스트에 표시되기 때문에 사람들이 패키지를 찾아내고 이해하는 데 도움이 됩니다.                                                                                                                                                                                                                                                                                                           |
| keywords        | 프로젝트를 검색할 때 참조되는 키워드입니다.<br/>description과 마찬가지로 npm search로 검색된 리스트에 표시됩니다.                                                                                                                                                                                                                                                                                                                                        |
| hompage         | 프로젝트 홈페이지 주소입니다.<br/>url 항목과는 다르며, url을 설정하면 예상치 못한 움직임을 하게 되므로 주의합니다.                                                                                                                                                                                                                                                                                                                                       |
| author          | 프로젝트 작성자 정보로, 한사람만을 지정합니다. JSON 형식으로 name, email, url 옵션을 포함합니다.                                                                                                                                                                                                                                                                                                                                                         |
| contributors    | 프로젝트에 참여한 공헌자 정보로, 여러 사람을 배열로 지정할 수 있습니다.                                                                                                                                                                                                                                                                                                                                                                                  |
| repository      | 프로젝트의 소스 코드를 저장한 저장소의 정보입니다.<br/>소스 코드에 참여하고자 하는 사람들에게 도움이 될 수 있습니다. 프로젝트 홈페이지 url을 명시해서는 안됩니다.                                                                                                                                                                                                                                                                                        |
| scripts         | 프로젝트에서 자주 실행해야 하는 명령어를 scritps로 작성해두면 npm 명령어로 실행 가능합니다.                                                                                                                                                                                                                                                                                                                                                              |
| config          | 소스 코드에서 config 필드에 있는 값을 환경 변수처럼 사용할 수 있습니다.                                                                                                                                                                                                                                                                                                                                                                                  |
| private         | 이 값을 true로 작성하면 중앙 저장소로 저장하지 않습니다.                                                                                                                                                                                                                                                                                                                                                                                                 |
| dependencies    | 프로젝트 의존성 관리를 위한 부분입니다. 이 프로젝트가 어떤 확장 모듈을 요구하는지 정리할 수 있습니다.<br/>일반적으로 package.json에 가장 많은 정보가 입력되는 곳입니다.<br/>애플리케이션을 설치할 때 이 내용을 참조하여 필요한 확장 모듈을 자동으로 설치해줍니다.<br/>따라서 개발한 애플리케이션이 특정한 확장 모듈을 사용한다면 여기에 꼭 명시를 해주어야 합니다.<br/>또한, npm install 명령은 여기에 포함된 모든 확장 모듈들을 설치하게 되어 있습니다. |
| devDependencies | 개발할 때만 의존하는 확장 모듈을 관리합니다.                                                                                                                                                                                                                                                                                                                                                                                                             |
| engine          | 실행 가능한 노드 버전의 범위를 결정합니다.                                                                                                                                                                                                                                                                                                                                                                                                               |

> dependencies를 덕분에 git이나 다른 곳에 배포할 때 모든 모듈들을 올릴 필요가 없어졌습니다.
