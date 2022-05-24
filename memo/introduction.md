# Introduction

- [Introduction](#introduction)
  - [1. Note Order](#1-note-order)
  - [2. NodeJS에 관하여](#2-nodejs에-관하여)
    - [2.1. Node.js란?](#21-nodejs란)
    - [2.2 npm이란?](#22-npm이란)
  - [3. express에 관하여](#3-express에-관하여)
    - [3.1. express란?](#31-express란)
    - [3.2. req와 res](#32-req와-res)

## 1. Note Order

프로젝트하면서 정리해 놓은 이 Note들은 Lecture Order에 기반을 두고 있으므로 다음과 같은 순서로 읽는 것이 좋습니다.

1.  [Introduction](./main/introduction.md)
2.  [Set-up](./main/set-up.md)
3.  [Express](./main/express.md)
4.  [Router](./main/router.md)
5.  [Templates](./main/templates.md)
6.  [Database](./main/database.md)
7.  [User Authentication](./main/user-authenticatoin.md)
8.  [User Profile](./main/user-profile.md)
9.  [Web Pack](./main/webpack.md)
10. [Video Player](./main/videoPlayer.md)
11. [Flash Message and Comment](./main/flashMessage-Comment.md)
12. [Deployment](./main/deployment.md)

[Note](./main/note.md)의 경우 최종 정리를 하면서 정리한 파일입니다.

## 2. NodeJS에 관하여

### 2.1. Node.js란?

**Node.js**는 Chrome V8 Javscript 엔진으로 빌드된 Javascript **런타임**입니다.

> 런타임이란 프로그래밍 언어가 구동되는 환경

예전에는 자바스크립트 런타임이 브라우저 밖에 존재하질 않았습니다.

하지만 그러한 한계를 극복하고 나온것이 **Node.js**입니다.

### 2.2 npm이란?

**npm**은 Node Packaged Manager의 약자로서, 자바스크립트 패키지 매니저이고 Node.js에서 사용할 수 있는 모듈들을 패키지화여 모아둔 저장소 역할을 하며 설치/관리를 수행할 수 있는 CLI를 제공합니다.

> CLI란 Command-line interface의 약자로서 명령어 인터페이스입니다. 가상 터미널 또는 터미널을 통해 사용자와 컴퓨터가 상호 작용하는 방식을 뜻합니다.

**Node Packaged Manager**를 좀 더 적어보자면, Packaged라는 것은 package로 만들어진 것들을 의미합니다. **package**는 모듈이라고 보면 되는데, 패키지나 모듈은 프로그램보다는 조금 작은 단위의 기능들을 의미합니다. **Manager**은 관리자를 의미합니다.

## 3. express에 관하여

### 3.1. express란?

**express**란 Node.js를 위한 빠르고 개방적인 간결한 웹 프레임워크라고 합니다. 좀더 구체적인 말로 표현하자면 NodeJS를 사용하여 쉽게 서버를 구성할 수 있게 만든 클래스와 라이브러리 집합체라고 보면 됩니다.

### 3.2. req와 res

**request**는 요청 객체로, 유저가 서버에게 무언가를 요구할 때 발생하는 것들 전부를 말합니다.
**response**는 응답 객체로, 반대로 서버가 유저의 요청에 응답하는 것을 말합니다.
