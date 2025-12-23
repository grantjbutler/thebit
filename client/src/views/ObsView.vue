<script setup lang="ts">
  import {ref, onMounted} from "vue";
  import obsScene from "../components/ObsScene.vue";

  interface Action {
    action: string;
    props: Array<string>;
  }

  type Protocol = Action[] | Map<string, Action[]>

  //const actions = ref<Array<string>>([]);

  const data = ref<Map<string, Action>>(new Map());
  const isLoading = ref(true);

  const fetchProtocol = async() => {
    try {
      const response = await fetch("/api/obs/actions")
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
  <div> Obs Scenes</div>
    <div v-if="isLoading === false">
      <div v-for="(value, key) in data">
        <obsScene :sceneName="key" :actions="value" />
      </div>
    </div>
  </main>
</template>
