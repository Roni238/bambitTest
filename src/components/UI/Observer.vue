<template>
  <div ref="observerRef" class="observer"/>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  action: {
    type: Function,
    required: true,
  },
})

const observerRef = ref(null)
let hasIntersected = false

const options = {
  rootMargin: '0px',
  threshold: 0.1,
}


const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      hasIntersected = true
      props.action()
    }
  })
}

let observer

onMounted(() => {
  if (observerRef.value) {
    observer = new IntersectionObserver(handleIntersection, options)
    observer.observe(observerRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>