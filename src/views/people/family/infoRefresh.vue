<template>
  <div v-loading="loading" style="width: 100%;height: 100%;">
  </div>
</template>

<script>
  export default {
    name: 'infoRefresh',
    data() {
      return {
        loading: true,
        refresh: ''
      }
    },
    methods: {
    },
    beforeCreate() {
      this.refresh = this.$route.query.id
      this.$router.push({ name: 'info', query: { id: this.refresh }})
    },
    mounted() {
    },
    beforeDestroy() {
    }
  }
</script>

<style scoped>
</style>
