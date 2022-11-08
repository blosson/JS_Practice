<template>
  <div id="app">
    <h1 id="head">Coffee Order App</h1>
    <OrderList/>   
    <MenuList/>
    <SizeList/>
  </div>
</template>

<script>
import OrderList from '@/components/OrderList'
import MenuList from '@/components/MenuList'
import SizeList from '@/components/SizeList'

export default {
  name: 'App',
  components: {
    OrderList,   
    MenuList,
    SizeList,
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  font-family: 'Noto Sans KR', sans-serif;
  padding: 0;
  margin: 0;

}
#head {
  margin-top: 60px;
  text-align: center;
}
ul {
  list-style: none;
}
</style>
