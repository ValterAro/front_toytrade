<template>
  <div class="container home my-5">
    <Carousel/>
    <HomeIntro/>

  </div>
</template>

<script>
// @ is an alias to /src

import Carousel from "@/components/home/Carousel.vue";
import HomeIntro from "@/components/home/HomeIntro.vue";

export default {
  name: 'HomeView',
  components: {HomeIntro, Carousel}
}
</script>
