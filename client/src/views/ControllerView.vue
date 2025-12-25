<script setup lang="ts">
  import InterfaceView from './InterfaceView.vue';
  import {ref, onMounted} from "vue";

  const isLoading = ref(true);
  let controllers = ref<string[]>([]);

  const fetchControllers = async() => {
    const response = await fetch("/api/controllers")
    const data = await response.json();

    console.log('Controllers', data)
    controllers.value = data;

  }

  onMounted(() => {
   fetchControllers();
  })
</script>

<template>
  <main>
    <template v-for="controller in controllers">
      <InterfaceView :title="controller.toUpperCase()" :controller="controller" />
    </template>
  </main>
</template>
