# DataBase

## 1. Database란?

**Front end**는 사용자, 클라이언트 측에게 보여지는 인터페이스를 개발하느 것이고,

**Back end**는 클라이언트 측과 상호작용 하기 위한 서버를 개발하는 일이다.

**Database**는 여러 사람이 공유하여 사용할 목적으로 체계화해 통합, 관리하는 데이터의 집합이다.

현재 이 프로젝트에서 Database를 사용할 목적은 유저의 계정 및 정보, 각종 비디오 등을 관리하는 목적으로 사용될 예정이다.

## 2. FakeDatabase 활용

**Database**를 활용하는 것을 알아보기 위해 FakeDatabase를 controller에 만들어서 살펴볼 예정이다.

### 2.1 Fake Database

FakeDatabase는 다음과 같이 되어 있다.

videoController.js

```js
let videos = [
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
    id: 2,
  },
  {
    title: "Third Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 3,
  },
];

...
```

home.pug

```pug
extends base.pug
include ./mixins/video.pug

block content
    h2 Welcome here you will see the trending videos
    ul
        each item in videos
            +video(item)
```

mixins/video.pug

```pug
mixin video(info)
  div
    if  info
      h4
        a(href=`/videos/${info.id}`)=video.title
      ul
        li  #{info.rating}/5.
        li  #{info.comments} comments.
        li  Posted #{info.createdAt}.
        li  #{info.views} views.
    else
      h4 Sorry nothing found.
```

여기서 보면, anchor안에 url적는 부분을 살펴보면 변수 사용할 때 **#{}** 가 아닌 **${}** 로 사용한 것을 확인 할 수 있다.

이것은 string안에 #{}을 적으면 변수로 인식하지 못하기 때문이다.

string안에 변수 사용하는 방식은 두 가지가 있다.

```pug
a(href=`/videos/${info.id}`)

a(href="/videos/" + video.id)
```

이렇게 **``(backtick)을 사용해서 ${}** 을 사용하거나 중간에 **" " + variable** 로 사용하는 두 가지 방식이 있다.

이제 home에서 anchor을 통해서 이동을 하면 url에 vidoe.id가 추가가 될 것이다. 이것을 controller에서 받아오려면 어떻게 해야될까? 그 때 사용하는 것이 **req.params**이다.

### 2.2 Request Properties

클라이언트가 서버에게 request를 요청하는 과정에서 여러가지 정보가 담겨 있는데 그것이 **req 객체**에 담겨있다. 이는 controller에서 확인이 가능하다.

이와 같이 하면 id 값을 가져올 수 있다.

videoController.js

```js

...

export const see = (req, res) => {
	const { id } = req.params;
	const video = videos[id - 1];
	return res.render("watch", { pageTitle: `Watching ${video.title}` });
};

...

```

여기서 `const { id } = req.params;`는 ES6를 사용함으로써 쓸 수 있는 코드이다.

다음 두 가지와 동일한 코드이다.

```js
const id = req.params.id;

const {
  params: { id },
} = req;
```

아래에 req객체 중에서도 자주 쓰이는 property를 정리해 보았다.

#### 2.2.1 req.params

**req.params**는 다음과 같은 정보를 가져올 수 있다.

예를 들어 /home/:id 경로가 있으면 **id속성**을 **req.params.id**으로 사용할 수 있다.

#### 2.2.2 req.query

**req.query**의 경우 경로의 각 Query 문자열 매개 변수에 대한 속성이 포함된 객체 프로퍼티이다.

예를 들어 `http://home/search?searchResult=thisthis이면` serachResult 매게변수의 thisthis라는 값(argument)를 가져온다.

#### 2.2.3 req.body

JSON 등의 데이터를 담을 때 사용한다.

주로 POST로 데이터를 전송할 때 사용한다.

요청 본문에 제출된 **Key-Value**를 포함한다. 이것은 기본적으로 정의되어 있지는 않으며 **express.json()** 이나 **express.urlencoded()** 와 같은 Middleware를 사용해야 한다.

**_다시 말하자면, req.body는 body-parser를 사용하기 전에는 default값으로 Undefined로 설정되어 있다._**

### 2.3 Edit Page

본격적으로 FakeDatabase를 활용해서 내용을 수정해 볼 것이다.

Edit Page를 만들기 전에 Edit Page를 어디를 통해서 갈 것인가를 생각해봐야한다. 메인 페이지에서 Edit Page로 가기 보다는 동영상 상세 페이지로 넘어가고 나서 그 동영상 수정 페이지로 넘어가는 방식이 일반적이다.

따라서 watch.pug를 다음과 같이 수정해준다.

watch.pug

```pug
extends base.pug

block content
    h3 #{video.views} #{video.views === 1 ? "view" : "views"}
    a(href=`${video.id}/edit`) Edit Video &rarr;
    //- &rarr은 오른쪽 화살표를 출력한다.

```

`/videos/:id`를 통해 이 페이지로 들어와 질 것이다. 그 후 anchor을 통해서 해당 id를 가지고 있는 video를 수정하는 페이지로 넘어가게 될 것이다.

> absolute URL vs relative URL
> 만약, /video/ 에서 a(href="/edit")를 타고 이동하면 어디로 이동을 할까?
>
> 그때 이동하는 페이지는 /video/13/edit이 아닌 /edit로 이동할 것이다.
>
> 이것이 바로 absolute URL이다.
>
> absolute URL의 경우 /"URL"로 입력하면 현재 어디에 있든 상관없이 root경로 + URL 로 이동한다.
>
> 그렇다면 a(href="edit")로 이동하면 어디로 이동을 할까?
>
> 그때 이동하는 페이지는 /video/edit로 이동할 것이다.
>
> Relative URL의 경우 "URL"을 입력하면 현재 위치하고 있는 경로 + URL로 이동을 한다.
>
> > /video/:id/edit로 이동하고 싶으면 a(href=`${video.id}/edit`)으로 써야한다. 만약 상대 URL a(href="edit")을 사용하여 이동하려했을 때 /video/:id/ -> /video/edit 으로 이동하게 될 것이다.

Edit Page는 다음과 같이 수정한다.

edit.pug

```pug
extends base.pug

block content
    h4 Change Title of video
    form(method="POST")
        input(name= "title", placehloder="Vidoe Title", type="text", value=pageTitle, required)
        input(value="Save", type="submit")
```

현재 Form의 전송방식을 보면 **POST**로 되어있는 것을 볼 수 있다.

### 2.4 Get Request vs Post Request

두 전송방식의 차이점은 URL을 통해서 설명을 할 수 있다.

다음은 GET방식을 사용했을 때 URL이다.

![GET URL](./screenshot/GET-URL.png)

현재 title이라는 변수에 Editing이 들어가 있다는 것을 URL을 통해서 알 수 있다. 즉, GET의 경우 Form을 사용하여 서버에 전송을 하면 전송 데이터가 URL에 드러난다. 검색이나, 동영상 시청 페이지등이 GET방식을 주로 사용한다.

다음은 POST방식을 사용했을 때 URL이다.

![POST URL](./screenshot/POST-URL.png)

데이터를 전송하는 것은 똑같지만 POST 전송 방식의 경우 데이터가 URL에 드러나지 않는 것을 확인할 수 있다. POST방식의 경우 로그인을 할 때나, database에 있는 값을 바꾸는 것을 보낼 때 사용한다.

그렇다면 POST 방식으로 request를 받을 때 서버가 controller를 이용하려면 어떻게 처리해야 되나?

라우터 객채에 get방식과 동일하게 해놓으면 된다.

Router.js

```js
videoRouter.post("/:id(\\d+)/edit", postEdit);
videoRouter.get("/:id(\\d+)/edit", postEdit);
```

여기서, 코드를 줄일 수 있는 방법이 있는데, 바로 router.route()를 사용하는 것이다.

```js
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
```

다음 controller로 가서 postEdit를 만들어 준다.

Controller.js

```js
export const postEdit = (req, res) => {
  const { id } = req.params;
  return res.redirect(`/videos/${id}`);
};
```

여기서 사용한 res.redirect()는 브라우저가 자동으로 이동하도록 하는 것이다.

페이지 이동은 해결을 했다.

그렇다면 데이터를 받아서 처리해주는 작업만이 남았다.

위에서 설명했듯이 req.body가 POST전송방식에서 자주 쓰이고, 사용하려면 express.urlencoded()를 해줘야 한다.

따라서 middleware로서 다음과 같이 추가해주고, 데이터 처리도 다음과 같이 해준다.

server.js

```js
app.use(express.urlencoded({ extended: true }));
```

controller.js

```js
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};
```

> 만약 req.body의 출력이 undefined로 나온다면, 두 가지를 살펴보자.
>
> 1.  Middleware가 정상적으로 적용이 되었는지?
>
> 2.  form에서 data전송할 때 attribute에 name을 넣어줬는지?

현재 배운 내용을 정리해보자면,

**_유저가 form을 get 또는 post하면 등록해둔 controller를 발동시켜서 유저들이 redirect되거나, 페이지에서 뭔가를 보게 된다._**

### 2.5 Fake Database 마지막 활용

그렇다면, upload를 하려면 어떻게 처리하면 될까?

다음과 같이 하면 될 것 같다.

1.  anchor을 이용해서 Upload Page로 갈 수 있도록 PUG를 수정하고, Upload Page를 만들어 준다.
2.  Upload의 경우 form 전송을 통해서 데이터를 데이터베이스에 넣어두는데, 이 과정은 POST로 이루어 질것이다.
3.  router객체에 Post를 등록해두고, controller를 생성해서 넣어놔준다.
4.  controller에서 데이터를 받아 저장까지 이루어진 후, redirect를 하면 마무리가 될 것이다.

이러한 방식으로 처리가 될 것이다.

코드는 생략하도록 하겠다.
