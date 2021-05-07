---
marp: true
theme: gaia
_class:
  - lead
paginate: true
auto-scaling: code
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

pre {
   font-size: 24px;
   line-height: 1.5;
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
   line-height: 1.5
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
   1. 구성
   2. 기획
2. 설계
   1. 마크업 & 스타일
   2. 웹표준과 접근성
3. 개발
   1. 개발 환경
   2. 메인 비디오 - 정두영
   3. 좌측 채널정보 - 김정원
   4. 우측 추천영상 - 김영종
4. 결론과 느낀점

---

# 완성 페이지 접속 링크

---

<!-- _class: lead -->

#### 개요

---

# 개요 - 선정이유

- V LIVE 사이트를 클론코딩 하기로 선정.

- V LIVE는 K-POP STAR들의 라이브 방송을 송출해 주는 서비스로 최근 K-POP의 열풍 덕분에 글로벌 트래픽 증가

- 하지만 글로벌하게 서비스함에도 접근성에 대해 아쉬운 부분이 존재.

![width:600px](./img/ppt_lighthous_before.png)
기존 VLIVE의 LightHouse 점수

---

# 개요 - 완성된 사이트

마크업 설계부터 접근성을 고려하여 사이트를 재설계

![width:600px](./img/ppt_lighthouse_after.jpg)
새롭게 만든 VLIVE의 LightHouse 점수

- 동영상을 IFRAME으로 삽입하여 만점을 받지는 못했다.

---

# 개요 - 구성

페이지의 구성은 크게 3단으로 되어있으며 데스크탑, 타블렛, 모바일에 따라 레이아웃이 달라진다.

![width:800px center](./img/md_responesive_layout.gif)

---

<!-- _class: lead -->

#### 설계

---

# 마크업

반응형 레이아웃을 위한 설계 방법을 고민

- float를 통한 레이아웃 구성
- flex를 통한 레이아웃 구성
- grid를 통한 레이아웃 구성

다양한 의견을 팀원들과 이야기하여 grid를 통해 레이아웃을 구성하면 적합하다고 판단하여 그리드를 사용

---

![width:400px right](./img/ppt_grid_code2.png)![width:400px right](./img/ppt_grid_code1.png)

# 마크업

## grid 코드

---

# SCSS

공통적으로 사용되는 스타일과 컴포넌트는 믹스인을 미리 설계하여 팀원들과 함께 사용했다.

## 박스 믹스인

```scss
@mixin box($color: $white, $width: auto) {
  background-color: $color;
  width: $width;
  @include desktop {
    border-radius: 15px;
  }
}
```

---

## 버튼 믹스인

```scss
@mixin buttonBox($isCircle: false, $size: rem(30px), $bg: transparent) {
  margin: 0;
  padding: 0;
  border: none;
  border-radius: rem(8px);
  appearance: none;
  background: none;
  cursor: pointer;
  background-color: $bg;
  @if $isCircle {
    width: $size;
    height: $size;
    border-radius: 50%;
  }
  &:hover {
    background-color: mix($bg, rgba(0, 0, 0, 0.15));
  }
}
```

---

## 접근성

- 접근성을 고려해 설계해야 하기 때문에 레이아웃부터 논리적인 순서를 고려해 마크업했다.

- 보이는 순서는 GRID를 통해 정렬되기 때문에 논리적인 마크업에 집중할 수 있었다.

---

전체적인 순서
![width:500px center](./img/md_layout_pc.png)

---

## 문제점 1

- 탭을 통해 이동시 동영상 섹션을 모두 탐색해야 이동할 수 있는데, 그러기에는 댓글이 너무많다!

  - 동영상 섹션 마지막에 포커싱을 이동할 수 있도록 기능을 추가하여 해결
  - 자세한 내용은 개발 파트에서 설명

---

## 문제점 2

![width:400px right](./img/md_channel_tabindex_fail.gif)

- 모바일 환경에서는 메뉴에 탭 접근이 엉망..
  - 자바스크립트를 통해 해결
  - 자세한 내용은 개발 파트에서 설명

---

<!-- _class: lead -->

#### 개발

---

![width:200px right](./img/ppt_parcel_logo.webp)![width:300px right](./img/ppt_yarn_logo.png)

# 개발 환경 / 사용 기술

- Yarn
- Parcel
  ![width:180px right](./img/ppt_sass_logo.png)
- SCSS(SASS)
  ![width:300px right](./img/ppt_postcss_logo.png)
- PostCSS
  - autoprefixer
  - postcss-combine-media-query
- Prettier
  ![width:100px right](./img/ppt_prettier_logo.png)
