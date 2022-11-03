<template>
  <div id="app">
    <h1>App</h1>
    <input v-model="appData" type="text">
    <p>appData: {{ appData }}</p>
    <p>parentData: {{ parentData }}</p>
    <p>childData: {{ childData }}</p>
    <HelloWorld/>
    <AppParent
      :app-to-parent="appData"
      :parent-to-child="parentData"
      :child-to-parent="childData"
      @parent-to-app="getParentData"
      @child-to-app="getChildData"
    />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import AppParent from '@/components/AppParent'

export default {
  name: 'App',
  components: {
    HelloWorld,
    AppParent
  },
  data: function () {
    return {
      appData: null,
      parentData: null,
      childData: null,
    }
  },
  methods: {
    getParentData: function (parentData) {
      this.parentData = parentData
    },
    getChildData: function (childData) {
      this.childData = childData
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
