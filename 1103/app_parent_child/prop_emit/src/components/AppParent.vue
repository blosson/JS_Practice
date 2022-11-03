<template>
  <div>
    <h1>AppParent</h1>
    <input type="text" @input="parentData">
    <p>appData: {{ appToParent }}</p>
    <p>parentData: {{ parentToChild }}</p>
    <p>childData: {{ childToParent }}</p>
    <AppChild
      :app-to-child="appToParent"
      :parent-to-child="parentToChild"
      :child-to-child="childToParent"
      @child-to-app="getChildData"
    />
  </div>
</template>

<script>
import AppChild from '@/components/AppChild'
export default {
  name: 'AppParent',
  components: {
    AppChild,
  },
  props: {
    appToParent: String,
    parentToChild: String,
    childToParent: String,
  },
  methods: {
    parentData: function (event) {
      this.$emit('parent-to-app', event.target.value)
    },
    getChildData: function () {
      this.$emit('child-to-app', event.target.value)
    }
  }
}
</script>

<style>

</style>