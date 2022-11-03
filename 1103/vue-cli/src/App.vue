<template>
  <div id="app">
    <MyComponent/>
    <HelloWorld/>
    <MyComponentSon @click.native="onClick"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MyComponent from '@/components/MyComponent'
import MyComponentSon from '@/components/MyComponentSon'
export default {
  name: 'App',
  components: {
    HelloWorld,
    MyComponent,
    MyComponentSon,
  },
  methods: {
    onClick: function () {
      console.log('rootClicked')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
