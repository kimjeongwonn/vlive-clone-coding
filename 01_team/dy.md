# Video Container & Comments Container

마크업을 진행할 때, 최대한 semantic 하게 코드를 짜기 위해서 최대한 의미를 가지고 있는 태그들을 활용하려고 노력했고, 웹 표준과 접근성 측면에서도 충분히 고려해보았다. Tab 순서, Screen Reader와 같은 보조기기들을 활용한 웹 콘텐츠 접근 및 마크업의 논리적인 순서 등을 고려하며 디자인만을 베끼는 단순한 클론 코딩을 피하려고 노력했다.

## 비디오

<img src='./img/ppt_video.png' width=600/>

비디오 부분은

- header 부분

- video 부분(video content와 video detail)

- 하트와 댓글을 남길 수 있는 video post 부분

### 고려사항

으로 나누어서 마크업을 진행하였다. 비디오의 헤더 부분은 동영상을 게시한 채널에 대한 정보(썸네일, 채널 이름, 그리고 동영상을 업로드한 시간 정보)와 오른쪽에 점 세개로 되어 있는 더보기 버튼으로 구성되어 있다. Tab 인덱스를 고려하였을 때, 썸네일 -> 채널 이름 -> 더보기(버튼) 순으로 구성을 했다.

비디오 Content와 detail 부분은 동영상 플레이어 부분과 동영상 info 부분으로 나누어져 있는데, 논리적인 흐름을 생각해보았을 때 동영상에 대한 정보가 먼저 나오는 것이 맞는 것같아서 동영상 info를 동영상 player보다 먼저 마크업하였다.

그리고 마지막으로 동영상 post 부분은 좋아요와 댓글, 그리고 북마크를 할 수 있는 곳이고 이 부분에서 접근성을 고려할 부분이 가장 많았다. 왜냐하면 Tab으로 검색한다고 생각을 했을 때, 동영상 컨테이너 다음 Tab의 순서가 채널로 가야할지, 다음 추천 영상으로 가야할지 고민이 많았기 때문이다. 그래서 한참을 고민하던 끝에, Tab이 동영상 컨테이너를 벗어날 때 채널로 이동할지, 추천 영상으로 이동할지 직접 정할 수 있도록 해주었다.

<img src='./img/ppt_a11y_tab_1.gif' width=600/>

그리고 나중에 `video__header` 와 `video__content` 를 상단에 sticky 하도록 구현해야 했는데, 구현하면서 알게 된 사실이 있다. `sticky` 속성은 부모 컨테이너 내부에서만 유효하고 부모 컨테이너의 끝을 만나면 sticky동작이 끝나게 된다는 것이다. 처음에 이 사실을 모르고 개발을 해 많이 고생했고 결국 `javascript`로 `is-fixed` 속성을 추가해주는 것으로 문제를 해결할 수 있었다.

```javascript
document.addEventListener("scroll", (e) => {
  let isFixed =
    window.innerWidth < 1024 && window.innerWidth <= window.innerHeight;
  const scroll = Number(document.documentElement.scrollTop);

  if (isFixed && scroll > 50) {
    classToggleHandler(e, board, "is-fixed", "on");
  } else {
    classToggleHandler(e, board, "is-fixed", "off");
  }
  if (isFixed && scroll > 60) {
    classToggleHandler(e, header, "is-fixed", "on");
    classToggleHandler(e, video, "is-fixed", "on");
  } else {
    classToggleHandler(e, header, "is-fixed", "off");
    classToggleHandler(e, video, "is-fixed", "off");
  }
});
```

위 코드는 처음엔 더 깔끔했지만, IE의 호환성 문제를 겪은 후 처렇게 수정을 했다. IE에 미디어쿼리와 javascript를 한번에 주니 IE에서는 이를 인식하지 못하였는지 전혀 동작하지 않았다. 아래와 같은 코드는 IE를 제외한 크롬, 사파리, 엣지 등의 브라우저에서는 정상적으로 동작한다.

```scss
&__content {
  @include sticky {
    &.is-fixed {
      position: fixed;
      top: 114px;
      width: 100%;
      z-index: 2;
    }
  }
```

<img src="./img/ppt_position.png" width=400/>

하지만 IE에서는 전혀 동작하지 않는다. 정확하게 말하면, `is-fixed`라는 클래스는 동적으로 부여되지만, 해당 클래스가 부여되었음에도 기능이 동작하지 않았다. IE의 개발자도구에 들어가서 확인해보면, `position: fixed`라는 속성이 전혀 부여되지 않는 것이다. 아마도 css의 미디어 쿼리와 동적인 클래스 부여가 동시에 발생했을 때 이를 감지하지 못하는 것으로 파악했고, 따라서 javascript로 css의 미디어 쿼리를 대신 수행하였다.

```scss
&__content {
  &.is-fixed {
    position: fixed;
    top: 114px;
    width: 100%;
    z-index: 2;
  }
}
```

그러자 IE 에서도 정상적으로 sticky 기능이 동작하는 것을 확인할 수 있었다.

## 댓글 부분

<img src="./img/ppt_comment.png" width=600/>

댓글 컨테이너는 위와 같이 구역을 나누어 마크업을 진행했다. 이는 크게

- 버튼 부분(라이브 채팅 보는 버튼)

- 댓글을 다는 `form` 부분

- 작성된 댓글들을 확인할 수 있는 `comments__container`

부분으로 구성되며 각각의 댓글은 `ul`의 `li`요소로 마크업 해주었다.

### 고려사항

그리고 논리적인 구조상 댓글 입려칸(입력칸 -> 이모티콘 -> 취소 -> 등록) -> 최신순(정렬) -> 전체 언어(언어 설정) -> 언어 설정 -> 더보기 -> 댓글들(작성자 -> 좋아요 -> 답글 쓰기)로 설정해주었다.

**탭 순서**
<img src="./img/ppt_comment_3.gif" width=600/>

그리고 각각의 댓글은 내부에 본문이 있고 좌측 상단에 아바타를, 그리고 우측 상단에 버튼(언어 설정, 더보기 버튼)을 `position: absolute`로 배치해주었다.

<img src="./img/ppt_comment_1.png" width=600/>

또한 VLIVE 에서는 댓글을 입력할 때 버튼 형식으로 댓글 창을 누르면 댓글을 입력할 수 있도록 해놓았다. 클릭한 경우에 댓글창이 늘어나며 border와 background가 바뀌는 효과를 주었는데, 여기에서는 그 효과를 애니메이션을 주어 아래와 같이 구현하였다.

<img src="./img/ppt_comment.gif" width=600/>

<br>
<br>

원본은 아래와 같다.

<br>

<img src="./img/ppt_comment_2.gif" width=600/>
