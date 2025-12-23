<script setup lang="ts">
  import ObsAction from "./ObsAction.vue";
  const props = defineProps(['sceneName', 'actions']);

  const sources = props.actions.find((action: { action: string; }) => action.action == 'toggleSource');
  const filters = props.actions.find((action: { action: string; }) => action.action === 'toggleFilter');
  const others = props.actions.filter((action: { action: string; }) => action.action !== 'toggleSource' && action.action !== 'toggleFilter');
  console.log('sources', sources)

  //const sourceButtons = sources.props.sourceName;

  const sendAction = async (event) => {
    const target = event.currentTarget;
    let formData = Object.fromEntries(new FormData(target));
    formData.sceneName = props.sceneName;
    console.log('formData', formData)
    const response = await fetch(`/api/obs/action`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log('toggle source', event);
    console.log('response', response)
  }
</script>

<template>
  <h1 class="title">{{ sceneName }}</h1>
  <h3 class="title is-5">Actions</h3>
  <template v-for="action in actions">
    <ObsAction :sceneName="sceneName" :action="action"/>
  </template>

</template>
