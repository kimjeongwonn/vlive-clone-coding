---
marp: true
theme: gaia
_class:
  - lead
paginate: true
backgroundColor: #f5f0fd
---

<style>
section {
   font-family: 'Nanum Gothic', sans-serif;
}

code{
   background: #8d54e6;
   padding: 2px 10px;
   border-radius: 5px;
}

pre code{
   color: #eee;
   background: #333;
   border-radius: 10px;
}

h1{
   font-size: 40px;
}

h2{
   font-size: 34px;
}

h3{
   font-size: 27px;
}

h4{
   font-size: 56px;
}

li, p{
   font-size: 24px;
   font-weight: 700;
}
img{
   border-radius: 10px;

}
img[alt~="center"] {
  display: block;
  margin: 0 auto;
}

img[alt~="left"] {
  float: left;
  margin-right: 20px;
}

img[alt~="right"] {
  float: right;
  margin-left: 20px;
}
</style>

#### VLIVE

![bg right:40% 60%](./img/ppt_vlive.png)

## 웹표준과 접근성을 중심으로

성수동 비타민 - 김영종, 김정원, 정두영

---

# 목차

1. 개요
   1.1 기획
   1.2 개발 환경
2. VLIVE 페이지 분석
   2.1 마크업 & 스타일
   2.2 웹준과 접근성
3. 프로젝트
   3.1 마크업 구조
   3.2 결과 및 시연
4. 이슈
   4.1 접근성 이슈
   4.2
5. 결론

---

# 누구누구

---

# 문제점

1. layout 구성시 `float` 속성을 사용하지 않고 `grid`를 선택한 이유
1. IE 에서 `is-fixed` 가 제대로 동작하지 않은 이유
1. Safari mobile 환경에서 댓글창 크기가 제대로 동작하지 않음

---

# 접근성 관련 이슈

1. sliding menu 내에서 닫기 버튼의 부재
2. tab index의 불합리성

---

# Video

![width:550px right](./img/ppt_video.png)

## 비디오 부분 마크업 & 디자인

- header 부분

- video 부분(video content와 video detail)

- 하트와 댓글을 남길 수 있는 video post 부분

### video content와 video post ?

나중에 `video__header` 와 `video__content` 를  
상단에 sticky 하도록 구현

---

![width:400px right](./img/ppt_sticky.gif)

# Video

## 비디오 부분 마크업 & 디자인

### Sticky...?

![width:600px](./img/ppt_box_2.png)

`video__header` -> position: sticky;
`video__content` -> position: sticky;

---

# Video

![width:400px right](./img/ppt_sticky_1.gif)

## 비디오 부분 마크업 & 디자인

<br>

### Sticky 문제점

- 원하는대로 동작하지 않음
- sticky가 적용된 상태로 아래에 있는 댓글을 읽을 수 없음

<br>

## Why?

---

# Video

![width:550px right](./img/ppt_sticky_3.gif)

## 비디오 부분 디자인

### CodePen 실험

![width:300px](./img/ppt_box.png)

- `position: sticky`는 부모 컨테이너  
  내부에서만 동작
- 따라서 원하던 기능을 구현할 수 없음

---

![width:350px right](./img/ppt_sticky_4.gif)

# Video

## 비디오 부분 디자인

### 해결 방안

- javascript로 `is-fixed` 클래스를 동적으로 부여

- `is-fixed` 일 때 `position: fixed`

### 하지만 ...

- IE 호환성 문제

![width:600px](./img/ppt_position.png)

---

# Video

## 비디오 부분 디자인

### IE 호환성 문제

```scss
&__content {
  // 미디어 쿼리, 동적인 클래스 추가
  @include sticky {
    &.is-fixed {
      position: fixed; // 위 두가지가 한번에 주어졌을 때 IE에서 이를 인식하지 못하는 문제 발생
      ...
    }
  }
}
```

---

# Video

## 비디오 부분 디자인

### IE 호환성 문제 - 코드 수정

<br>

```scss
&__content {
  &.is-fixed {
    position: fixed; // 이렇게 미디어 쿼리를 제거해주고,
    ...              // 그 대신에 javaScript로 미디어 쿼리 조건을 체크해줌
  }
}
```

---

![width:450px right](./img/ppt_sticky_2.gif)

# Video

## 비디오 부분 디자인

<br>

### 해결 결과

- 미디어 쿼리 대신 javaScript `window.innerWidth`사용
- 동적으로 `is-fixed` 클래스를 부여해 `position: fixed`

---

# Video

## 비디오 부분 접근성

![width:780px right](./img/ppt_desktop.png)

### 논리적인 흐름:

- 동영상 info를 동영상 player보다 먼저 마크업

- 스크린 리더 고려

- 탭의 자연스러운 이동

---

![width:410px right](./img/ppt_video_tab.gif)

# Video

## 비디오 부분 접근성

### 탭 아웃라인의 부재:

- 채널 아바타부터 시작해 탭을 누르고 있지만  
  탭이 어디 위치하고 있는지 전혀 알 수 없음

- 그러다가 갑자기 추천영상으로 탭이가서 혼란스러움

<!-- 2. 사용자가 직접 순서를 선택

   2.1 채널 보기
   2.2 추천 영상 보기 -->

<!-- ![width:680px](./img/ppt_scroll.gif) -->

---

![width:400px right](./img/ppt_video_tab_1.gif)

# Video

## 비디오 부분 접근성

### 접근성 향상 결과:

- 채널 아바타부터 시작해 탭을 누를 때, 탭이 어디에 위치해 있는지 명확하게 보여줌

- 그 다음으로 어디를 탐색하고 싶은지 정할 수 있도록 함
  - 디폴트는 댓글 쓰는 입력칸으로 tab 이동

---

# Video

## 비디오 부분 접근성

### 접근성 향상 결과: 추가적인 탭 탐색 기능 구현

1. 채널 보기
2. 추천 동영상 보기

![width:900px center](./img/ppt_scroll.gif)

---

# Video

## 비디오 부분 접근성

### 명도 대비

![width:340px left](./img/ppt_video_contrast_1.png)

![width:400px left](./img/ppt_video_contrast_2.png)

![width:340px left](./img/ppt_video_contrast_3.png)

명도 대비가 AA 기준을 만족하지 못하고 있다.

---

# Video

## 비디오 부분 접근성

### 명도 대비

![width:340px left](./img/ppt_video_contrast_4.png)

![width:400px left](./img/ppt_video_contrast_5.png)

![width:340px left](./img/ppt_video_contrast_6.png)

명도 대비를 확실하게 차이를 주어서 접근성을 향상시킴

---

![width:400px height:500px right](./img/ppt_comment.png)

# Comments

## 댓글 부분 마크업 & 디자인

- 댓글을 다는 `form`

- 작성된 댓글들을 확인할 수 있는 `comments__container`

- 각각의 댓글들

   <br>

  댓글: 좌, 우 `position: absolute`

  ![width:660px left](./img/ppt_comment_1.png)

---

# Comments

## 댓글 부분 마크업 & 디자인

### 원본

![width:700px right](./img/ppt_comment_2.gif)

- `fieldset` 에 애니메이션을 적용
  (`focus-within`)
- 사용자가 댓글을 입력하고자 할 때 댓글 입력창을 유동적으로 변경

---

# Comments

## 댓글 부분 마크업 & 디자인

### 결과

![width:800px center](./img/ppt_comment.gif)

- `focus-within`

---

![width:700px right](./img/ppt_comment_tab_1.gif)

# Comments

## 댓글 부분 접근성

### 탭의 불합리성

- 댓글 입력칸부터 차례대로 tab

- 탭 아웃라인이 중간중간 제대로 보이지 않음

- 탭의 순서: 아바타, 작성자, 좋아요, 답글 쓰기, 언어 설정, 더보기

---

# Comments

![width:740px right](./img/ppt_comment_3.gif)

## 댓글 부분 접근성

### 논리적인 구조

- 댓글 입력칸부터 차례대로 tab

- 탭의 아웃라인을 확실히 보여줌

- 탭의 순서

  1.  댓글 입려칸(입력칸 ->  
      이모티콘 -> 취소 -> 등록)

  2.  최신순(정렬) -> 전체 언어

  3.  언어 설정 -> 더보기

  4.  댓글들(작성자 ->
      좋아요 -> 답글 쓰기)
