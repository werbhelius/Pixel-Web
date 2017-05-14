<template lang="html">
  <h1>TimeLine</h1>
</template>

<script>

import { getHomeTimeline } from '../../api/impl/home-timeline'

export default {
  name: "main",
  created() {
    this.homeTimeline()
  },
  methods: {
    homeTimeline() {
      getHomeTimeline(
            1,
            response => {
                console.log(response);
            },
            err => {
                console.log(err);
            }
        )
    }
  }
}
</script>

<style lang="css">
</style>
