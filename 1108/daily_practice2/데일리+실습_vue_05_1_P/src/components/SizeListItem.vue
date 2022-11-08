<template>
  <div>
    <span
      :class="{ 'is-selected': size.selected }"
      @click="updateSizeList"
      >
      {{ size.name }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'SizeListItem',
  props: {
    size: Object,
  },
  methods: {
    updateSizeList() {
    this.$store.dispatch('updateSizeList', this.size)
    }
  },
}
</script>

<style>
  .is-selected {
    background-color: green;
  }
</style>