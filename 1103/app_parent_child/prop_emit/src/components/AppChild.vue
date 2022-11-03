<template>
  <div>
    <h1>AppChild</h1>
    <input type="text" @input="childData">
    <p>appData: {{ appToChild }} </p>
    <p>parentData: {{ parentToChild }} </p>
    <p>childData: {{ childToChild }}</p>
  </div>
</template>

<script>
export default {
  name: 'AppChild',
  props: {
    appToChild: String,
    parentToChild: String,
    childToChild: String,
  },
  methods: {
    childData: function () {
      this.$emit('child-to-app', event.target.value)
    }
  }
}
</script>

<style>

</style>