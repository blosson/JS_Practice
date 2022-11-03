<template>
  <div>
    <h3>Son of Son!!!</h3>
    <p>{{ staticProps }}</p>
    <p>{{ dynamicProps }}</p>
    <button @click="childToParent">Go to your dad!</button><br>
    <input 
      type="text"
      v-model="childInputData"
      @keyup.enter="childInput"
    >
    <button>테스트용 버튼</button>
    <button>랜덤 버튼</button>
  </div>
</template>

<script>
export default {
  name: 'MyComponentSon',
  props: {
    staticProps: String,
    dynamicProps: String,
  },
  methods: {
    childToParent: function () {
      this.$emit('child-to-parent', 'son\'s data')
    },
    childInput: function () {
      this.$emit('child-input', this.childInputData)
      this.childInputData = null
    }
  },
  data: function () {
    return {
      childInputData: null,
    }
  },
}
</script>

<style>

</style>