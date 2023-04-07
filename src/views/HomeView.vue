<template>
  <div class="home">
    <headerBar />
    <HelloWorld />
  </div>
</template>

<script>
// @ is an alias to /src
import headerBar from "@/components/headerBar.vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    headerBar,
    HelloWorld,
  },
};
</script>
