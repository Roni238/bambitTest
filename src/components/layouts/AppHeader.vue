<template>
    <header class="bg-neutral-900 text-white p-4 shadow-md max-w-[600px]">
        <div class="container mx-auto">
            <form @submit.prevent="handleSubmit" class="flex bg-neutral-800 rounded-md">

                <input
                    v-model="filteredValue"
                    @input="filterInput"
                    type="text"
                    placeholder="Введите ID альбомов через пробел"
                    class="p-2 rounded-md text-white flex-1"
                />

                <button v-if="photosState.searchFilter" class="h-10 flex p-2 fill-white mr-1 rounded-md hover:bg-neutral-700" @click="photosState.clearSearch" >
                    Назад
                </button>
                <button class="h-10 flex p-2 fill-white rounded-md hover:bg-neutral-700" @click="photosState.searchAlbum">
                    Поиск
                </button>
                
            </form>
        </div>
      
    </header>
</template>

<script setup>
  import { computed } from 'vue'
  import { usePhotosStore } from '@/stores/photos'
  
  const photosState = usePhotosStore()
  
  // Привязываем напрямую через computed
  const filteredValue = computed({
    get: () => photosState.searchFilter,
    set: (value) => {
      photosState.searchFilter = value
    }
  })
  
  function filterInput(event) {
    let inputValue = event.target.value
    inputValue = inputValue.replace(/[^0-9\s]/g, '') // Оставляем только цифры и пробелы
    filteredValue.value = inputValue // Обновляем через computed
  }
</script>
