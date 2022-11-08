<template>
  <div>
    <span
      :class="{ 'is-selected': menu.selected }"
      @click="updateMenuList"
      >
      {{ menu.title }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'MenuListItem',
  props: {
    menu: Object,
  },
  methods: {
    updateMenuList() {
      this.$store.dispatch('updateMenuList', this.menu)
    }
  }
}
</script>

<style>
  .is-selected {
    background-color: green;
  }
</style>