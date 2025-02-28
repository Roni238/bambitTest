<template>
  <AppHeader/>
  <div>
    <p>Count: {{ counter.count }}</p>
    <button @click="counter.increment">Increment</button>
    <button @click="counter.decrement">Decrement</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'
import AppHeader from '@/components/layouts/AppHeader.vue';

const counter = useCounterStore()
</script>


