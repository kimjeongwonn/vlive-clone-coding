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
   color: #efe5ff;
   background: #8067a7;
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

li, p{
   font-size: 24px;
   font-weight: 700;
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

# VLIVE

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

<!-- _class: lead -->

# 추천영상 파트

### 김영종

---

# 결과

![width:1000px center](./img/yj/layout.png)

정보가 쌓이는 방향이 데스크탑, 테블릿, 모바일을 기준으로 상당 부분 변경된다.

---

# 마크업

- 정보가 쌓이는 방향(데스크탑 모바일)
  ![width:600px](./img/yj/direction.png)
  디바이스의 크기에 따라서 추천영상의 레이아웃을 3단계로 변경해 주어야 한다. 기준이 필요하기 때문에 공통으로 적용되는 부분중 가장 겹치는 부분이 많은 모바일과 데스크 탑을 기준으로 마크업 작성

---

- 논리적으로 배치 되었는가?
  - 일반적으로 리스트에 포함된 영상을 본 후에 보고싶은 영상이 없다면 다음 리스트를 보여준다.
  - 영상 정보는 제목이 가장 중요하기 때문에 제목(부가정보), 썸네일 순으로 배치

---

### 스크린리더 사용자를 고려한 마크업 배치

![width:800px right](./img/yj/org_markup.png)

1. 헤더
2. 버튼
3. 추천 영상 리스트

<br/><br/><br/><br/>

### 문제점

영상에 대한 정보를 모두 듣고나서 버튼을 클릭하기 위해 위쪽으로 올라와 버튼을 클릭해야 한다.

---

### 수정된 마크업 순서

![width:800px right](./img/yj/markup.png)

1. 헤더
2. 추천 영상 리스트
3. 버튼

<br/>
<br/>
<br/>

다음 리스트 보기 버튼 을 최하단에 배치했다. 추천 영상 목록에 있는 영상들을 먼저 읽어준 후에 다음 리스트 보기 버튼을 클릭할 수 있도록 구성하는 것이
사용자의 입장에서 더 편리할 것이라 생각했기 때문이다.

---

# 스타일

1. 영상이 쌓이는 방향

- 모바일, 데스크탑: 영상이 수직 방향으로 쌓인다.
- 테블릿: 영상이 수평 방향으로 쌓인다.

2. 썸네일과 부가정보의 배치

- 테블릿, 데스크탑: 썸네일이 상단에, 부가정보는 하단에 배치된다.
- 모바일: 썸네일이 왼쪽에, 부가정보는 오른쪽에 배치된다.

3. 부가정보가 배치되는 순서

- 수직 방향으로 쌓인다.

---

# 접근성

##### 1. 부분 포커스 아웃라인

기존 사이트: 자동 재생 버튼에 아웃라인이 적용되어 있지 않음

- 입력장치에 별로 접근성을 고려한다면 탭을 통해서만 아웃라인이 보여지도록 만들어야 한다.

```scss
&:focus {
  + .related__check-lb {
    outline: 2px solid black;
  }
}
&:focus:not(:focus-visible) {
  + .related__check-lb {
    outline: none;
  }
}
```

---

# 접근성

구현 결과: 마우스로 포커스 된 경우는 아웃라인이 표시되지 않는다.
![width:600px center](./img/yj/auto.gif)

---

## IE에서는 `focus-visible`을 지원하지 않기 때문에 크로스 브라우징 이슈가 있었다.

크로스 브라우징에 완벽히 대응하지는 못했지만, 아래 코드를 활용하면 각각의 브라우저 별로 미디어 쿼리를 적용할 수 있다는 사실을 알아냈다.

```scss
@media all and (-ms-high-contrast: none) {
  /* IE10+ CSS styles go here */
  .related__check {
    @include a11yHidden;
    &:focus {
      + .related__check-lb {
        outline: none;
      }
    }
  }
}
```

---

### 3. 부분언어 적용 - WCAG 이해성 성공 기준 3.1.2

글로벌 서비스기 때문에 영어로 제목이 올라오는 경우가 다수 있었다. 부분적으로 언어속성을 적용해서 사용자 에이전트가 언어의 정보를 올바르게 읽을 수 있도록 설정했다.

```html
<p class="video__title" lang="en">SANA’s TW-LOG with SECRET FRIEND</p>
```

---

### 4. 정보에 대한 라벨 누락 - WCAG 이해성 성공 기준 3.3.2

부가 정보를 읽어줄 때, 각 정보에 라벨이 붙어있지 않아 어떤 정보인지 구분하기 힘든 문제점이 있었다.

```html
<em class="related__group-name">
  <span class="a11y-hidden">그룹 명</span>
  TWICE
</em>
<div>
  <span class="a11y-hidden">등록일</span>
  <time class="related__upload-date" datetime="2020-04-30T18:10">
    2020.4.30.
  </time>
</div>
```

위와 같이 각 정보마다 해당 라벨을 span 태그로 삽입해서 어떤 정보인지 구분할 수 있도록 해주었다.
