<template>
  <div w-full h-screen flex-center>
    <canvas ref="canvasRef" width="600" height="600" border></canvas>
  </div>
</template>

<script setup lang="ts">
import { CanvasTree } from './assets/CanvasTree';

const canvasRef = ref<HTMLCanvasElement>()
const ct = new CanvasTree({
  offset: 0.5,
  renderRate: 6,
  lengthOffset: 3,
  maxDepth: 30,
  minDepth: 5,
  chance: 0.5,
})

onMounted(() => {
  ct.mount(canvasRef.value!).render()
})
</script>

<style scoped></style>
