<template>
  <div class="border">
    <h1>Son's Component</h1>
    <MyComponentSon 
      static-props="component에서 son으로"
      :dynamic-props="dynamicProps"
      @child-to-parent="parentGetEvent" 
      @child-input="getDynamicData"
    />
    <MyComponentSon @click="onClick"></MyComponentSon>
    <MyComponentSon @click.native="onClick"></MyComponentSon>
  </div>
</template>

<script>
import MyComponentSon from '@/components/MyComponentSon'
export default {
  name: 'MyComponent',
  components: {
    MyComponentSon,
  },
  data: function () {
    return {
      dynamicProps: "It's in data"
    }
  },
  methods: {
    parentGetEvent: function (data) {
      console.log(`자식 컴포넌트에서 ${data}받은 썰 푼다`)
    },
    getDynamicData: function(sonData) {
      console.log(`Son한테 ${sonData} 받음`)
    },
    onClick: function () {
      console.log('Clicked')
    }
  }
}
</script>

<style>
  .border {
    border: solid;
  }
</style>