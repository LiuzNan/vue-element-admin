<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {}
</script>

<style>
  /*控制整个滚动条*/
  ::-webkit-scrollbar {
    background-color: lightgray;
    width: 10px;
    height: 10px;
    background-clip: padding-box;
  }

  /*滚动条中间滑动部分*/
  ::-webkit-scrollbar-thumb {
    background-color: #B3C0D1;
    border-radius: 5px;
  }
</style>
