# lecture express part

이 노트의 경우 강의를 들으면서 작성해 놓은 내용을 그대로 옮겨 놓은 것이다.

## server가 무엇인가?

서버는 24시간 내내 온라인에 연결된 컴퓨터 그리고 request를 listening하고있다.

## request와 response?

request는 무엇인가?

ex)google.com을 간다면, 지금 google.com에 request를 보낸것

ex)google.com/login이면, google서버에 /login으로의 requeset 그걸 google.com 서버는 listening하는 중인것, 유뷰트 재생클릭, 등등... 

결국 **서버와 상호작용 하는 모든 것이 전부 request**이다.

브라우저를 통해서 서버에게 보낸다.

/는 root를 의미한다.

웹사이트 접속할때 벌어지는 get은 "해당 페이지를 갖다줘" 할 때의 get으로 사용된다.


기본적인 코드 작성은 express application가 만들어진 다음부터 코드를 작성해야 한다.

```javascript
import express from "express";

const PORT = 4000;

const app = express();	--> application을 만들기


///이부분아래로 코드 작성을 해야 한다는 것

///application설정 하는 부분
app.get("/", () => console.log("Somebody is trying to go home."))



///아래 부분에서 listen하는것( 외부에 개방 )
const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} 🔥`);

app.listen(PORT, handleListening);
```

### app.get("/", CALLBACK)?

누군가가 어떤 route로, 이 경우엔 home으로 get request를 보낸다면,
반응하는 callback을 추가하면된다. ( callback의 경우 함수를 보내야 한다. )

**if) app.get("/", () => console.log("Somebody is trying to go home."))**

이런식으로 해서 그냥 보내면 브라우저는 request를 요청하고 **무한 로딩**이 걸릴 것이다. 

why? 응답을 해줘야 하는데 안해줘서 그런다.

결국 정리하자면, 브라우저는 서버에 무언가를 request하는데
request를 하는 방법 중 하나는, url에게 get request를 보내는 것이다.

### response는 어케하는가?

간단하게 말하자면, Argument를 사용한다.
위에 코드를 아래로 다시한번 가져와 보자.

```javascript
import express from "express";

const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
	return res.ens();
};

const handleLogin = (req, res) => {
	return res.send("I still login");
};

app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} 🔥`);

app.listen(PORT, handleListening);
```

이떄 req, res라는 Arg가 들어갔는데 Arg명은 중요하지 않다. **몇번째 인자냐가 중요.**

첫번째 Arg의 경우 **request Argument**이고, 두번째 Arg의 경우가 **Response Argument**인 것이다.

console.log를 사용해서 req를 들여다 보면, 쿠키나 method, 등등 여러가지 정보가 담겨있다.

console.log를 사용해서 res를 들여다 보면, 또한 여러가지 정보가 들어있다.

**res.end()** 를 통해서 종료시킬 수 있고, **res.send()** 를 통해서 메세지를 입력할 수도 있다.



----------------

### Middleware

**Middleware는 중간에 있는 소프트웨어** 즉, request와 response사이에 있는 것.

모든 middleware는 handler고, 모든 handler는 middleware이다. **( handler == controller )**

**controller는 어떻게 사용하는가?**

위에서 하나만 가져와서 살펴보자면,

```javascript
const handleHome = (req, res, ***next***) => {
	return res.sens();
};
```

이와 같이 next라는 인자를 추가하여 사용하면 된다.

정확히 사용하는 방식을 적어보자면, 

```javascript
const gossipMiddleware = (req, res, next) => {
	console.log("I'm in the middle!");
	next();
};

app.get("/", gossipMiddleware, handleHome);
```

이러한 방식으로 controller를 중간에 넣어주면서 middleware역할을 수행하는 것이다.
단, gossipMiddleware처럼 next();를 호출한다면 이것은 middleware이다.

여기서 만약 그러면 

```javascript
const gossipMiddleware = (req, res, next) => {
	return res.send("I love middlewares");
	next();
};
```

이러한 식으로 쓴다면? => handleHome은 실행조차 되지 않을 것이다.

app.get()말고 다른 것도 있는데, 그것이 app.use()이다.
app.use는 global middleware를 만들 수 있게 해준다.

순서는 middleware를 use하는 게 먼저오고, 그다음에 URL의 get이 와야 한다.
이러한 방식으로 처리하면 app.use를 활용한 middleware를 위에다 두면, 모든 route에 적용되는 것이다.

밑에와 같이 사용할 수 있다는것을 볼 수 있다.

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
	console.log("Allowed, you may continue.");
	next();
};

const handleHome = (req, res) => {
  return res.send("I love middlewares"); 
};

app.use(privateMiddleware);
app.get("/", logger, handleHome);
app.get("/protect", () => console.log("Welcome to my private lounge!");

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
```

Morgan은 node.js용 request logger middleware다.

morgan에서 logger역할인 morgan("dev")의 경우
Middelware를 사용할 경우 출력에 GET, path, status code, 응답시간.. 등 출력 해준다.

