# Templates

- [Templates](#templates)
  - [1. Templates Engine이란?](#1-templates-engine이란)
  - [2. PUG란?](#2-pug란)
    - [2.1 PUG 문법](#21-pug-문법)
    - [2.2 PUG 설치 및 원리](#22-pug-설치-및-원리)
  - [3. PUG 사용 방법](#3-pug-사용-방법)
    - [3.1 include(코드 삽입)](#31-include코드-삽입)
    - [3.2 inheritance(상속)](#32-inheritance상속)
    - [3.3 변수 처리](#33-변수-처리)
    - [3.4 conditionals(조건문 사용법)](#34-conditionals조건문-사용법)
    - [3.5 iteration(배열 사용법)](#35-iteration배열-사용법)
    - [3.6 Mixing(함수)](#36-mixing함수)
  - [4. [MVP] CSS 프레임 워크](#4-mvp-css-프레임-워크)

## 1. Templates Engine이란?

**템플릿 엔진(Template Engine)** 은 PHP나 JSP처럼 동적인 결과를 정적인 파일(HTML)에 담기 위해 사용합니다. 즉, 서버 코드인 Javascript로 연산된 결과를 변수에 넣고 변수를 뷰(view) 파일에서도 사용할 수 있도록 해줍니다. 따라서 서버 파일내에 HTML코드를 쓰지 않아도 되므로 뷰와 서버 코드를 따로 따로 관리할 수 잇도록 해줍니다.

## 2. PUG란?

View Engine인 PUG를 사용할 것인데, PUG는 기존의 HTML을 더욱 간결하게 만든 코드로 Javascript 코드를 사용할 수도 있습니다. 이 PUG를 이용해서 동적 뷰를 만들어 보기 전에 HTML코드와의 차이점을 정리해 봅시다.

### 2.1 PUG 문법

- 태그의 꺽쇠기호 '<>'를 표시하지 않습니다.
- 닫는 태그가 없이 여는 태그만 존재하여 **들여쓰기(TAB키)** 를 이용하여 **종속성을 구분**합니다.
- JavaScript언어를 사용하고 싶으면 **#{Code}** 를 이용하면 됩니다.
- String 안에서 사용하는 Javascript는 **backtick(``)** 과 **${}** 를 활용합니다.
- id나 class를 선언하기 위해서는 CSS의 기본 선택자를 사용하면 됩니다.
- 태그 없이 id나 class를 선언하면 자동으로 div태그가 생성됩니다.
- Script나 CSS로 태그를 사용할 때에는 끝에 '.'을 입력합니다.
- 여러줄 입력할 때 ( | ) 로 작성합니다.

이정도 정리하고, 나머지는 아래에 코드 예시를 들어가면서 더 나오는거 있으면 살펴보겠습니다.

### 2.2 PUG 설치 및 원리

먼저, View Engine **PUG**를 사용하기 위해서 다음과 같이 설치를 해줍니다.

    npm i pug

설치가 완료되면 express에게 html helper로 pug를 사용하겠다고 알려줘야 합니다. 즉 setting을 해줘야 하는 것입니다.

    app.set("view engine", "pug);

Express는 view engine을 사용하기 위해 찾는 기본 디렉토리가 현재 작업 디렉토리의 views라는 폴더로 되어 있습니다. 이것을 수정하고 싶으면 다음과 같이 하면 됩니다.

먼저 현재 작업 디렉토리를 확인해줘야 합니다. 참고로 default repository의 경우 package.json이 있는 폴더입니다.

    console.log(process.cwd());

    app.set("views", process.cwd() + "/src/views");

이와 같은 과정을 거치고 나면 다음과 같이 app.js가 되어 있을 것입니다.

app.js

```javascript
import express from "express";
import globalRouter from "./routers/globalRouter";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use("/", globalRouter);

const handleListening = () => console.log(`Server on`);

app.listen(4000, handleListening);
```

PUG를 사용하기 위해서 router, controller는 다음과 같이 해봅시다.

router.js;

```javascript
const globalRouter = express.Router();

globalRouter.get("/", home);

export default globalRouter;
```

controller.js;

```javascript
export const home = (req, res) => res.render("home");
```

home.pug

```pug
doctype html
html(lang="ko")
  head
    title Using View Engine
  body
    h1  Practice Using View Engine

    footer &copy 2022

```

작동 원리는 다음과 같습니다.

1.  클라이언트가 서버에 Request 요청
2.  get 메소드를 타고 router객체가서 해당 URL에 맞는 콜백 함수(controller) 실행.
3.  controller에서 home.pug를 렌더링(Rendering)을 해줘서 html로 변환한 뒤 내부 javascript를 실행하여 텍스트로 바꾼 후 유저 UI를 형성합니다.

> 여기서 렌더링이란 웹사이트 코드를 사용자가 웹 사이트를 방문할 때 보게되는 대화형 페이지로 바꾸는 웹 개발에 사용되는 절차를 의미합니다.
> 이 용어의 경우 HTML, CSS, Javascript 코드의 사용을 나타냅니다.
>
> 참조:
>
> > [[HTML] 렌더링(Rendering)이란?](https://chunggaeguri.tistory.com/entry/HTML-%EB%A0%8C%EB%8D%94%EB%A7%81Rendering%EC%9D%B4%EB%9E%80) > > [HTML 기초 - 3 (렌더링이란?)](https://velog.io/@ru_bryunak/%EB%A0%8C%EB%8D%94%EB%A7%81%EC%9D%B4%EB%9E%80)

## 3. PUG 사용 방법

위에서 잠깐 pug 코드를 봤지만, 여기서 재대로 다뤄볼 예정입니다.

먼저 PUG는 views라는 폴더 안에 위치되어 있어야 하고, [기본 문법](#21-pug-문법)은 위에 글로 정리를 해 놓았습니다. 코드 위주로 살펴보겠습니다.

### 3.1 include(코드 삽입)

watch.pug

```pug
doctype html
html(lang="ko")
    head
        title Wetube
    body
        h1 Watch Video
        footer &copy #{new Date().getFullYear()} Wetube
```

이 코드를 살펴보면 Tag를 사용할 때 닫는 Tag를 사용하지 않고 **앞에** 사용하든가 **들여쓰기**를 활용하는 것을 확인할 수 있습니다.

javascript를 활용하고 싶으면 이와 같이 #{}안에 작성해주면 작동이 됩니다.

footer같은 경우 여러 페이지에서 동일하게 쓰이는 경우가 많습니다. 이때 PUG는 include를 활용하여 중복되는 코드 문제를 해결할 수 있습니다.

partials/footer.pug

```pug
footer &copy #{new Date().getFullYear()} Wetube
```

watch.pug

```pug
doctype html
html(lang="ko")
    head
        title Wetube
    body
        h1 Watch Video
    include partials/footer.pug
```

home.pug

```pug
doctype html
html(lang="ko")
    head
        title Wetube
    body
        h1 Welcome to Wetube
    include partials/footer.pug
```

이와 같이 해결을 하고 나니 home.pug와 watch.pug에서 또 코드의 중복이 보입니다. body안에 있는 내용을 제외한 나머지가 중복이 됩니다. 이때 사용하는 것이 **inheritance(상속)** 입니다.

### 3.2 inheritance(상속)

**상속**은 **일종의 베이스**를 만들어 준다.

레이아웃의 베이스, 혹은 HTML의 베이스 이 베이스로부터 확장해 나가는 것입니다.

base.pug

```pug

doctype html
html(lang="ko")
  head
    block head
  body
    block content

    include partials/footer.pug

```

watch.pug

```pug

extends base.pug

block head
  title Watch | Wetube

block content
  h1  Watch Video!!

```

home.pug

```pug

extends home.pug

block head
  title Home | Wetube

block content
  h1  Main Page!!

```

**block**은 **템플릿의 창문**같은 것입니다. base가 되는 파일은 block(창문)을 만들어 두고, 확장을 하면 그 block안의 내용을 채우면 되는 것입니다.

확장을 하고나니, 확장을 한 페이지들끼리 또 중복이 되는 것이 보입니다.

바로 head부분입니다.

여러 페이지에서 저것과 동일한 방식을 사용하고 나면, 많은 중복으로 인해 처리하기 힘들어질 것입니다.

저 부분만 차이가 있으니 **변수 처리**를 하면 될 것 같습니다.

### 3.3 변수 처리

base.pug

```pug

doctype html
html(lang="ko")
    head
        title
        	#{pageTitle} | WeTube
    body
        block content
    include partials/footer.pug

```

#{}은 javascript 코드를 가져오는 것이라고 말했습니다.

하지만 pageTitle은 존재하지 않습니다. 저런 변수를 선언해준 적이 없기 때문입니다.

그렇다면, 저 변수를 주기 위해선 어떻게 해야될까요?

현재 사용하고 있는 Express 뷰 엔진인 pug는 누가 렌더링을 해주는 것일까요?

답은 컨트롤러입니다.

즉, 렌더링 하는 컨트롤러에서 변수를 보내주면 되는 것입니다.

controller.js

```js
exrport const home = (req, res) => res.render("home", {pageTitle: "Home"});
```

첫번째 인자는 파일 이름입니다. 두번쨰 인자가 원하는 만큼 변수를 보낼 수 있는 오브젝트입니다.

변수를 사용하는 방법은 #{}말고도 한 가지 방법이 더 있습니다.

    h1=pageTitle

이러한 방식을 사용하여 처리 할 수 있습니다.

이 방식의 경우 다른 text와 섞여서 쓰이지 않을 경우 사용되는 방법이니 알아둡시다.

둘 다 사용하는 방법이니 알아둡시다.

### 3.4 conditionals(조건문 사용법)

PUG의 conditionals의 경우 if나 if else를 템플릿에서 사용하여 조건에 맞을 때만 보여주는 식으로 활용을 할 수 있습니다. 활용하는 방법을 보여주기 위해 fakeUser객체를 만들어서 pug에 보내줍시다.

controller.js

```js
const fakeUser = {
  username = "Beom",
  loggenIn = false
};

export const trending = (req, res) => res.render("home", {pageTitle: "Home", fakeUser: fakeUser})
//여기서 ES6를  fakeUser: fakeUser대신 fakeUser만 써서 보낼 수 있습니다.
```

base.pug

```pug
doctype html
html(lang="ko")
  head
    title #{pageTitle} | Wetube
  body
    header
      if fakeUser.loggedIn
        small Hello #{fakeUser.username}
      nav
        ul
          if  fakeUser.loggedIn
            li
              a(href="/logout") Log out
          else
            li
              a(href="/login")  Log In
      h1=pageTitle
    main
      block content
    include partials/footer.pug
```

home.pug는 block만 채워넣으면 되므로 생략하겠습니다.

이런식으로 conditionals를 사용하여 상황에 맞게 렌더링이 가능해졌습니다.

### 3.5 iteration(배열 사용법)

그렇다면 Array는 어떻게 사용할까요? 먼저 controller에서 pug로 Video Array를 보내줍시다.

controller.js

```js
export const trending = (req, res) => {
  const videos = [
    {
      title: "First Video",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 1,
    },
    {
      title: "Second Video",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 1,
    },
    {
      title: "Third Video",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 1,
    },
  ];
  return res.render("home", { pageTitle: "Home", videos });
};
```

pug에서 Array를 사용하려면 **each X in Y**를 사용하면 됩니다. python 에서 for X in Y와 비슷하다고 보면 됩니다.

home.pug

```pug
extends base

block content
    h2 Welcome Home page
    each video in videos
    	div
        if  video
          h4=video.title
          ul
            li #{video.rating}/5.
            li #{ivideonfo.comments} comments.
            li Posted #{video.createdAt}.
            li #{video.views} views.
        else
          ul
            li Sorry nothing found.
```

**each X in Y** 에서 X는 아무 변수명이나 들어가도 상관 없는데 Y의 경우 controller에서 가져오는 것이므로 사용하려는 배열을 정확히 써주어야 합니다.

여기서 Video의 경우 다른 페이지에서 자주 활용될 것입니다. 그래서 이 Video는 따로 함수의 형태로 활용하고 싶다. 그때 사용하는 것이 **Mixin**입니다.

### 3.6 Mixing(함수)

**minxin**은 pug함수로서, "자바스크립트 형식"이라는 말처럼, "반복되는" html을 함수 형태로 만들 수 있도록 기능을 제공합니다.

Mixin의 사용법은 다음과 같습니다.

views/mixins/video.pug

```pug
mixin video(info)
  div
    if  info
      h4=info.title
      ul
        li  #{info.rating}/5.
        li  #{info.comments} comments.
        li  Posted #{info.createdAt}.
        li  #{info.views} views.
    else
      h4 Sorry nothing found.
```

home.pug

```pug
extends base
include mixins/video

block content
    h2 Welcome Home page
    each item in videos
        +video(item)
```

인자를 받지 않는경우 **_+Mixin_** 으로 사용하고,
위와 같이 인자를 받는 경우 **_+Mixin(Arg)_** 와 같이 사용하면 됩니다.

## 4. [MVP] CSS 프레임 워크

CSS 프레임워크 중에서 가장 심플한 것이 mvp입니다. Bootstrap, Material, Foundation과 같은 CSS 프레임워크를 사용할 때는 해당 프레임워크가 만든 class명을 써줘야 합니다. 하지만 MVP는 기본 HTML태그를 있는 그대로 꾸며줍니다.

_참고_

- [MVP CSS](https://andybrewer.github.io/mvp/)
- [PUG Documnet](https://pugjs.org/api/getting-started.html)
