# austin-util-js Library

웹 프론트 단을 개발하면서 조금 더 효율적이고 빠르게 로직이나 코드를 완성할 수 있도록 도와주는 라이브러리입니다.

- `main.min.js` 파일을 복사 후 `<script>`태그에 코드를 직접 삽입하여 사용할 수 있습니다.
- `npm i austin-util-js` 명령으로 패키지를 설치 후 import하여 사용할 수 있습니다. (**프로토타입이 완성된 후 패키지 등록 예정입니다. 현재는 npm을 통해 사용할 수 없습니다.**)

## 메인 함수

`$_(selector)`: document.querySelector(selector)로 DOM 객체를 찾아, 여러 유틸 메서드를 추가하여 반환합니다.

> $\_()함수가 반환하는, 여러 메서드가 추가된 DOM 객체를 **`Austin객체`**로 부르며 설명을 이어가겠습니다.

## Austin 객체에서 사용할 수 있는 메서드

- `hide()`: 객체의 스타일을 `display: none`으로 변경합니다.
- `show(displayMode='block')`: 객체의 display 스타일을 인자값으로 변경합니다.

## 객체의 메서드가 아닌, 일반 호출 함수들

### \_observe

`_observe(doms, fnAppear = null, fnDisappear = null, options = {})`  
화면 영역에 특정 DOM 객체가 나타나거나 사라질 때마다 작업할 내용을 예약합니다.

**doms**  
화면에 나타나거나 사라지는지 감시당하는 DOM 객체들입니다. 여러 객체를 배열에 담아 넘겨도 되고, 배열에 담지 않고 하나의 객체만 넘겨도 됩니다.

**fnApear, fnDisappear**  
감시당하는 DOM객체가 화면에 나타났을 때 실행할 콜백 함수, 화면에서 사라졌을 때 실행할 콜백 함수입니다. 두 함수 모두 실행 시에는 인자를 하나만 넘기도록 구현되었으며, 해당 인자는 감시당하는 DOM객체를 말합니다. 아래는 예시 코드입니다.

```javascript
const fnO = (dom) => {
  // #root 엘리먼트가 뷰포트 영역에 들어올 때마다 실행됩니다.
  console.log("Appear: ", dom.nodeName);
};

const fnX = (dom) => {
  // #root 엘리먼트가 뷰포트 영역에서 사라질 때마다 실행됩니다.
  console.log("Disappear: ", dom.nodeName);
};

_observe(document.querySelector("#root"), fnO, fnX);
```

**options**  
\_observe 함수는 내부적으로 intersectingObsever API를 이용하여 구현됩니다. options 객체는 intersectinObserver 객체를 생성할 때 넣을 옵션을 의미합니다.

### \_unobserve

`_unobserve(doms)`  
특정 객체가 화면 영역에 나타나거나 사라지는지 더이상 감시하지 않습니다. 성능 측면에서 불필요한 감시를 없애기 위해 사용합니다.

**doms**  
화면에 나타나거나 사라지는지 더이상 감시 당하지 않을 DOM 객체들입니다. 여러 객체를 배열에 담아 넘겨도 되고, 배열에 담지 않고 하나의 객체만 넘겨도 됩니다.

### \_scroll

`_scroll(mode, fn)`
화면을 scroll 했을 때 실행할 함수를 등록합니다.

**mode**  
스크롤의 방향으로 'up', 'down' 둘 중 하나를 지정해야 합니다. up은 위쪽, down은 아래쪽입니다.

**fn**  
mode에 지정한 방향으로 스크롤이 일어났을 때 실행될 함수입니다.
