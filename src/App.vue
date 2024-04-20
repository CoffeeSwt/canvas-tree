<template>
  <div w-full h-screen flex-center>
    <canvas ref="canvasRef" :width="width" :height="height" border></canvas>
  </div>
</template>

<script setup lang="ts">
import { CanvasTree } from './assets/CanvasTree';

const width = ref(600)
const height = ref(600)
const canvasRef = ref<HTMLCanvasElement>()

onMounted(() => {
  const ct = new CanvasTree(canvasRef.value!)
  ct.render()
})
</script>

<style scoped></style>
