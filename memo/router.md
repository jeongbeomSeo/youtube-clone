# Router part

- [Router part](#router-part)
  - [1. Router란 무엇인가?](#1-router란-무엇인가)
  - [2. Router 사용 방법](#2-router-사용-방법)
    - [2.1 If) URL에 변수가 필요한 상황이라면?](#21-if-url에-변수가-필요한-상황이라면)

## 1. Router란 무엇인가?

**Router**는 클라이언트의 요청 경로(path)를 보고 이 요청을 처리할 수 있는 곳으로 기능을 전달해주는 역할을 한다. 이러한 역할을 **라우팅**이라고 하는데, 에플리케이션 엔드 포인트 (URI)의 정의, 그리고 URI가 클라이언트 요청에 응답하는 방식을 의미한다.

**좀더 쉽게 말하자면,** **Router**는 controller와 URL의 관리를 쉽게 해주는 것으로 **mini application**을 만들어 주는 것이다.

> URI란 무엇인가?
>
> Uniform Resource Identifier의 약자로 URL 과 URN을 포함하고 있는 것이라고 보면된다.
>
> URL은 자원의 위치를 나타내 주는 것이고 URI는 자원의 식별자를 나타낸다.
>
> 출처: [jch9537님의 URI & URL](https://velog.io/@jch9537/URI-URL)

## 2. Router 사용 방법

express에선 이러한 라우터를 미들웨어로서 제공하고 있다. 사용하는 방식은 아래와 같다.

```javascript
// 라우터 객체 참조
const router = express.Router();

// 라우팅 함수 등록
const handelHome = (req, res) => res.send("Home");

router.get("/", handleHome);

...

// 라우터 객체를 app 객체에 등록
app.use('/', router);
```

클라이언트에서 요청한 요청 경로에 따라 실행될 함수는 라우터(router) 객체를 사용해 등록한다.

router 객체의 route() 메소드를 통해 요청 경로를 지정할 수 있으며, get(), post() 등의 메소드를 호출하면 실행될 함수를 등록할 수 있다.

```javascript
router.get(실행될 함수);
router.post(실행될 함수);
```

요청 패스를 라우터 객체에 등록할 때 사용하는 메소드엔 callback 함수인 get, post, put, delete, all 등이 있다.

실제론 이렇게 하나의 파일 안에서 모든 라우팅 함수를 등록하는 것이 아니라, 각 경로 별로 라우팅 함수를 정의한 다음 그것을 하나의 파일로 묶어 모듈화시킨다.

**Express/server.js**

```javascript
import homeRouter from "./routes/homeRouter";
import userRouter from "./routes/userRouter";

app.use("/", homeRouter);
app.use("/user", userRouter);
```

**Express/routes/homeRouter.js**

```javascript
const homeRouter = express.Router();

const handleHome = (req, res) => res.send("Home");

homeRouter.get("/", handleHome);

...

export default homeRouter;
```

**Express/routes/userRouter.js**

```javascript
const userRouter = express.Router();

const handleUser = (req, res) => res.send("User");

userRouter.get("/", handleUser);
    ...


export default userRouter;
```

이러한 방식으로 코드 정리가 이루어 진다.

> 여기서 Router를 export할 때 default로해서 내보낼 수 있는 것은 해당 파일에서 유일하게 export하는 것이기에 가능한 것이고, default로 해서 내보낼 때 import를 받는 server.js에선 다른 이름으로 해서 받을 수 있다.

라우팅이 이루어 지는 과정은 다음과 같다.

예를 들어, /user/edit 간다고 한다면,

1.  클라이언트가 서버에 Request요청
2.  서버가 server.js에서 app 객체에 /user로 등록되어 있는 경로가 있는지 체크후 라우터 객체로 넘어간다.
3.  라우터 객체에서 /edit가 등록되어 있는 콜백 함수로 가서 실행.

    > userRouter안에 들어가서 맞는 주소는 다음과 같이 찾는다.

    > /user/ + /edit

    > 즉, userRouter안에 들어가 있는 시점에서 userRouter의 기본 path는 /user 이다.

여기서 코드 정리를 좀 더 들어가자면, 처음에 controller의 경우 얼마 안되는 코드 길이를 가지고 있지만, 나중에 여러가지 기능구현이 들어가기 시작한다면 분리가 되어 있는 것이 작업에 더 좋을 것이다.

따라서 controllers의 폴더를 만들어서 분리해서 export하면 다음과 같다.

**Express/controllers/controller.js**

```javascript
export const handleHome = (req, res) => res.send("Home");
export const handleuser = (req, res) => res.send("Home");
```

이러한 식으로 처리한다면 controller와 router가 분리될 것이다.

### 2.1 If) URL에 변수가 필요한 상황이라면?

youtube같은 곳을 보면 URL이 미세하게 다른 것을 확인 할 수 있을 것이다.

만약, 동영상이 올라올 때마다 서버에서 새로운 url을 만들어서 app객체에 넣어주고, router객체에도 추가하는 작업을 해야 한다면 서버는 원활히 이루어 질 수 조차 없을 것이라고 생각한다.

그렇다면, 변수를 활용한다면 이러한 문제를 해결 할 수 있지 않을까?

변수 사용법은 다음과 같다.

**Express/routes/movieRouter.js**

```javascript
const homeRouter = express.Router();

const handleMovie = (req, res) => {
  return res.send(`Movie ID is ${req.params.id}`);
};

homeRouter.get("/:id", handleHome);

export default homeRouter;
```

url이 들어가는 부분에 **:**(Colon)를 활용하면 된다.

:id 에서 id는 변수명이라고 생각하면 되고, 변수에 들어가는 value값은 URL에서 가져와서 넣어지게 된다.

> 이때 주의해야 할 점은, 변수를 사용하는 객체가 위에 올라가 있으면 모든 URL을 변수로 인식해버릴 것이다. 변수를 사용하는 URL은 아래에 위치하도록 해야한다.

여기서, 특정 조건을 걸어서 받는 방법은 변수명 옆에 정규 표현식을 사용해서 넣어주면 된다.

예를 들면,

    app.get("/ab*cd", (req, res) => res.send("Home"));

이런식으로 코드를 처리하여 ab와 cd사이에 오는 모든 문자는 다 받아서 처리할 수 있고,

```javascript
Router.get("/:id(\\d+)", (req, res) => res.send("Home"));
```

이런식으로 해서 숫자만 받을 수 있다. (Javascript라 \하나 더 추가 된 것)

참고: [[Node.js] Express 4: 라우터(Router) — TaxFree](https://cotak.tistory.com/85)
