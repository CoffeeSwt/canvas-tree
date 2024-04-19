<template>
  <div w-full h-screen flex-center>
    <canvas ref="canvasRef" :width="width" :height="height" border></canvas>
  </div>
</template>

<script setup lang="ts">
const width = ref(600)
const height = ref(600)
const canvasRef = ref<HTMLCanvasElement>()
const ctx = computed(() => canvasRef.value?.getContext('2d'))
onMounted(() => {
  const canvas = canvasRef.value!

})
</script>

<style scoped></style>
