# Challenge Note

해당 페이지는 Challenge를 하다가 찾아보면서 정리한 파일이다.

## JS 함수

## for ...in / for ...of / forEach

| for...in                     | for...of                                     | forEach                           |
| ---------------------------- | -------------------------------------------- | --------------------------------- |
| 객체의 열거 가능한 모든 속성 | [Symbol.iterator]속성을 가지는 컬렉션의 요소 | Array 객체에서만 사용 가능 메소드 |

### forEach 반복문

**forEach 반복문**은 오직 **Array객체에서만 사용가능한 메소드**이다.(ES6부터는 Map, Set등에서도 지원된다.) 배열의 요소들을 반복하여 작업을 수행할 수 있다.
forEach구문의 인자로 **callback함수**를 등록할 수 있고, **_배열의 각 요소들이 반복될 때 이 callback함수가 호출_** 된다. callback 함수에서 배열 요소의 인덱스와 값에 접근 가능하다.

```js
const items = ["item1", "item2", "item3"];

items.forEach(function (item) {
  console.log(item);
});
// 출력 결과: item, item2, item3
```

### for ...in 반복문

**for in 반복문**은 **객체의 속성**들을 반복하여 작업을 수행할 수 있다. **_모든 객체에서 사용이 가능합니다._** **for in구문은 객체의 key값에 접근할 수 있지만, value값에 접근하는 방법은 제공하지 않습니다.** 자바스크립트에서 객체 속성들은 내부적으로 사용하는 숨겨진 속성들을 가지고 있다. 그 중 하나가 [[Enumerable]]이며, **for in 구문은 이 값이 true로 셋팅**되어 속성들만 반복할 수 있습니다. 이러한 속성들을 **열거형 속성**이라고 부르며, 객체의 모든 내장 메소드르 비롯해 각종 내장 프로퍼티 같은 **비열거형 속성**은 반복되지 않는다. 다음 예시를 보면서 이해하자.

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
};

for (const prop in obj) {
  console.log(prop, obj[prop]);
}
// 출력 결과: a 1, b 2, c 3
```

### for ...of 반복문

**for on**반복문은 ES6에 추가된 새로운 컬렉션 전용 반복 구문이다. **for of**구문을 사용하기 위해선 컬렌션 객체가 [symbol.iterator]속성을 가지고 있어야만 한다.

```js
const iterable = [10, 20, 30];

for (const value of iterable) {
  console.log(value);
}
// 출력 결과: 10, 20, 30
```

### for in 반복문과 for of 반복문의 차이점

- for in 반복문: 객체의 모든 열거 가능한 속성에 대한 반복
- for of 반복문: [Symbol.iterator] 속성을 가지는 컬렉션 전용

**for in 반복문**

```js
const iterable = [10, 20, 30];

const obj = {
  a: 1,
  b: 2,
  c: 3,
};

const string = "string";

for (const prop in obj) {
  console.log(prop);
  console.log(obj[prop]);
}
// 출력 결과: a, b, c
//           1, 2, 3
for (const prop in iterable) {
  console.log(prop);
  console.log(iterable[prop]);
}
// 출력 결과: 0, 1, 2
//           10,20,30
for (const prop in string) {
  console.log(prop);
  console.log(iterable[prop]);
}
// 출력 결과: 0,  1,  2,  3,  4,  5
//          "s","t","r","i","n","g"
```

**for of 반복문**

```js
const iterable = [10, 20, 30];

const obj = {
  a: 1,
  b: 2,
  c: 3,
};

const string = "string";

for (const prop of obj) {
  console.log(prop);
}
// 출력 결과: Uncaught TypeError: obj is not iterable

for (const prop of iterable) {
  console.log(prop);
}
// 출력 결과: 10, 20, 30

for (const prop in string) {
  console.log(prop);
}
// 출력 결과: "s","t","r","i","n","g"
```

요약하자면,

> for ...in// 객체 순환
> for ...of// 배열 값 순환
> 이라고 정리해서 사용하면 편리할 것 같다.

### includes()

**Array**안에 특정 요소를 포함하고 있는지 판별해주는 메소드이다. 이것은 파이썬에서 **in** 과 비슷한 기능을 한다.

[MDN includes()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

## router사용시 주의 사항

### 정규식의 중요성

챌린지를 하는 과정에서 다음과 같은 오류가 발생했다.

![정규식의 중요성](screenshot/정규식의%20중요성.png)

오류 발생 상황은 다음과 같다.

Add페이지를 에서 이와 같은 오류가 나고 렌더링이 안된다.

오류 발생 코드를 살펴보면 **Cannot read properties of undefined ( reading 'title')** 이라고 나와있다.

이 오류의 경우 undefined에서 properties를 불러올 수 없다. 즉, 내가 undefined를 가져오고 있다는 것이다.

현재 router의 코드르 살펴보면 다음과 같다.

router.js

```js
import express from "express";
import { home, movieDetail, getAdd, postAdd } from "./movieController";

const movieRouter = express.Router();

movieRouter.get("/", home);
movieRouter.get("/:id", movieDetail);
movieRouter.route("/add").get(getAdd).post(postAdd);

export default movieRouter;
```

여기서 **:id**가 변수로서 활용되는데 정규식을 사용하지 않아서 모든 문자를 전부 변수 취급해버리고 있다.

즉, 내가 add페이지를 간다고 URL에서 이동을 하기는 했지만, 정작 **콜백한 함수는 movieDetail**이였던 것이다. 실제로 movieDetail함수로 가서 console.log(movie)를 적어놓으니 출력이 되었고, 그 출력은 **undefined**로 되어 있었다.
