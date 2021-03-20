<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="stylus">

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color:#343A42;
  
  font-size 14px
</style>
<script>
export default {
  created(){
    this.$free.setLocal('firstUrl',location.href.split('#')[0])
  }
}
</script>
