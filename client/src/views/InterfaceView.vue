<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import type { Actions } from '../action.js';
  import ActionsView from "@/components/ActionsView.vue";

  interface Action {
    action: string;
    props: Array<string>;
  }

  const data = ref<Actions>({});
  const isLoading = ref(true);

  const fetchProtocol = async() => {
    try {
      const response = await fetch("/api/atem/actions")
      data.value = await response.json();

    } catch(error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => {
    fetchProtocol();
  })
  //const actions = await response.json();
</script>

<template>
  <main>
    <div v-if="isLoading === false">
      <ActionsView :name="'ATEM Actions'" :actions="data" />
    </div>
  </main>
</template>
