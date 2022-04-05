# EXPRESS PART

- [EXPRESS PART](#express-part)
  - [1. server란 무엇인가?](#1-server란-무엇인가)
  - [2. request와 response?](#2-request와-response)
    - [2.1 app.get("/", CALLBACK)?](#21-appget-callback)
    - [2.2 response는 어케하는가?](#22-response는-어케하는가)
    - [2.3 Middleware](#23-middleware)

## 1. server란 무엇인가?

서버는 24시간 내내 온라인에 연결된 컴퓨터 그리고 request를 listening하고 있습니다.

## 2. request와 response?

request는 무엇인가?

**서버와 상호작용 하는 모든 것이 전부 request**입니다.

클라이언트가 원하는 것을 요구하기 위해 브라우저를 통해서 서버에게 보내는 요청문을 말하는 것입니다.

웹사이트 접속할때 벌어지는 get은 "해당 페이지를 갖다줘" 할 때의 get으로 사용됩니다.

기본적인 코드 작성은 express application가 만들어진 다음부터 코드를 작성해야 합니다.

```javascript
import express from "express";

const PORT = 4000;

const app = express();

app.get("/", () => console.log("Go Home!"));

const handleListening = () => console.log(`Server On`);

app.listen(PORT, handleListening);
```

가장 기본적인 라우팅방식으로 보면 됩니다.

먼저 express를 import를 해주고 application을 만듭니다.

    const app = express();

를 통해서 application을 만들었다면 이것을 이용해서 라우팅 메소드를 사용할 수 있습니다.

위의 코드의 경우 get메소드를 통해서 root로 갔을 때 console.log를 출력 하는 방식입니다.

app.listen을 통해서 해당 PORT 받아서 열어 주는 방식으로 마무리가 됩니다.

### 2.1 app.get("/", CALLBACK)?

get()은 주소창에 입력 받았을 때 실행할 사항들을 나타내는 라우팅 함수입니다.

도메인 뒤에 붙은 주소가 해당 함수에 들어가 있는 값과 일치하면 해당 함수에 들어가 있는 함수가 실행됩니다.

누군가가 어떤 route로, 이 경우엔 home으로 get request를 보낸다면,
반응하는 callback을 추가하면 됩니다. ( callback의 경우 함수를 보내야 합니다. )

    app.get("/", () => console.log("Go Home!"));

이런식으로 해서 그냥 보내면 브라우저는 request를 요청하고 **무한 로딩**이 걸릴 것입니다.

**_why? 응답을 해줘야 하는데 안해줘서 그런겁니다._**

결국 정리하자면, 브라우저는 서버에 무언가를 request하는데
request를 하는 방법 중 하나는, url에게 get request를 보내는 것입니다.

그리고 request로 요청을 했으면 **response**가 필요한 것입니다.

### 2.2 response는 어케하는가?

간단하게 말하자면, Argument를 사용합니다.
위에 코드를 아래로 다시 한번 가져와 보겠습니다.

```javascript
import express from "express";

const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
  return res.end();
};

app.get("/", handleHome);

const handleListening = () => console.log(`Server on`);

app.listen(PORT, handleListening);
```

이떄 req, res라는 Arg가 들어갔는데 Arg명은 중요하지 않습니다. **몇번째 인자냐가 중요**합니다

첫번째 Arg의 경우 **Request Argument**이고, 두번째 Arg의 경우가 **Response Argument**인 것입니다.

- console.log를 사용해서 req를 들여다 보면, 쿠키나 method, 등등 여러가지 정보가 담겨 있습니다.

- console.log를 사용해서 res를 들여다 보면, 또한 여러가지 정보가 들어 있습니다.

**res.end()** 를 통해서 종료시킬 수 있고, **res.send()** 를 통해서 메세지를 입력할 수도 있습니다.

이러한 방식으로 **res**라는 Arg를 이용해서 Response를 처리합니다.

### 2.3 Middleware

**Middleware는 중간에 있는 소프트웨어** 즉, request와 response사이에 있는 것을 말합니다.

모든 Middleware는 handler이지만, 모든 handler가 Middleware인 것은 아닙니다. **( handler == controller )**

**controller는 어떻게 사용하는가?**

위에서 하나만 가져와서 살펴보자면,

```javascript
const handleHome = (req, res, next) => {
  return res.send();
};
```

이와 같이 **next**라는 인자를 추가하여 사용하면 됩니다.

정확히 사용하는 방식을 적어보자면,

```javascript
const gossipMiddleware = (req, res, next) => {
  console.log("I'm in the middle!");
  next();
};

app.get("/", gossipMiddleware, handleHome);
```

이러한 방식으로 controller를 중간에 넣어주면서 middleware역할을 수행하는 것입니다.
gossipMiddleware처럼 **next()** 이것은 middleware인 것입니다.

여기서 만약 그러면

```javascript
const gossipMiddleware = (req, res, next) => {
  return res.send("I love middlewares");
};

app.get("/", gossipMiddleware, handleHome);
```

이러한 식으로 쓴다면? => handleHome은 실행조차 되지 않을 것입니다.

즉, Middleware에서 끊키지 말고 **next()** 를 사용하여 **res까지 도달하도록 해줘야 하는 것**입니다.

여기서 잠깐, Middleware는 get에 의존해서만 사용할 수 있는 것인가?

그렇지 않습니다. **app.use()** 를 사용하는 방식이 있습니다.

**_app.use는 global middleware를 만들 수 있게 해줌으로써 Middleware를 응용프로그램에 바인딩하기 위해서 사용합니다._**

순서는 middleware를 use하는 게 먼저오고, 그다음에 URL의 get이 와야 합니다.

app.use를 활용한 middleware를 위에다 두면, 모든 route에 적용되는 것입니다.

밑에와 같이 사용할 수 있습니다는것을 볼 수 있습니다.

```javascript
import express from "express";

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const privateMiddleware = (req, res, next) => {
	const url = req.url;
	if(url === "/protected") {
		return res.send("<h1>Not Allowed</h1>);
	}
	next();
};

const handleHome = (req, res) => {
  return res.send("I love middlewares");
};

app.use(privateMiddleware);
app.get("/", logger, handleHome);
app.get("/protect", () => console.log("Welcome to my private lounge!");

const handleListening = () =>
  console.log(`Server On!`);

app.listen(PORT, handleListening);
```

logger이라는 middleware를 활용해서 req의 정보를 알 수 있고, privateMiddleware를 통해서 지정된 url에 가는 것을 막아 줄 수 있습니다.

지정된 url가는 것을 막으려면 get의 Arg로 사용되는 것이 아닌, global Middleware로 활용되어야 하므로 app.use가 사용됩니다.

> cf) Morgan은 node.js용 request logger middleware다.
>
> morgan에서 logger역할인 morgan("dev")의 경우
> Middelware를 사용할 경우 출력에 GET, path, status code, 응답시간.. 등 출력 해준다.
