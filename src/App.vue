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

interface Point {
  x: number,
  y: number
}

interface Line {
  startPoint: Point,
  length: number,
  angle: number
}

const drawLine = (l: Line) => {
  lineTo(l.startPoint, getEndPoint(l))
}
const getEndPoint = (l: Line) => {
  return {
    x: l.startPoint.x + l.length * Math.cos(l.angle),
    y: l.startPoint.y + l.length * Math.sin(l.angle)
  }
}
const pendingTasks: Function[] = []
const setp = (l: Line, depth = 0) => {
  const endPoint = getEndPoint(l)
  drawLine(l)
  const leftLine: Line = {
    startPoint: endPoint,
    length: l.length + (Math.random() * 5 - 5),
    angle: l.angle - 0.3 * Math.random()
  }


  const rightLine: Line = {
    startPoint: endPoint,
    length: l.length + (Math.random() * 5 - 5),
    angle: l.angle + 0.3 * Math.random()
  }
  if (depth >= 30) return
  if (Math.random() < 0.4 || depth < 4) {
    pendingTasks.push(() => {
      setp(leftLine, depth + 1)
    })

  }
  if (Math.random() < 0.4 || depth < 4) {
    pendingTasks.push(() => {
      setp(rightLine, depth + 1)
    })
  }
}

const frame = () => {
  const tasks = [...pendingTasks]
  pendingTasks.length = 0
  tasks.forEach(fn => fn())
}

let renderCount = 0
const render = () => {
  requestAnimationFrame(() => {
    if (renderCount % 3 == 0)
      frame()
    render()
    renderCount++
  })
}

const lineTo = (startPoint: Point, endPoint: Point) => {
  ctx.value?.beginPath()
  ctx.value?.moveTo(startPoint.x, startPoint.y)
  ctx.value?.lineTo(endPoint.x, endPoint.y)
  ctx.value?.stroke()
}

const init = () => {
  const line: Line = {
    startPoint: { x: width.value / 2, y: height.value },
    length: 20,
    angle: - Math.PI / 2
  }
  setp(line)
  render()
}
onMounted(() => {
  init()
})
</script>

<style scoped></style>
