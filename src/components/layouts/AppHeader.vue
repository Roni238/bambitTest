<template>
    <header class="bg-neutral-900 text-white p-4 shadow-md max-w-[600px]">
      <div class="container flex gap-3 mx-auto">
        <form @submit.prevent="photosState.searchAlbum" class="flex flex-1 bg-neutral-800 rounded-md">
          <input
            v-model="filteredValue"
            @input="updateQuery"
            type="text"
            placeholder="Введите ID альбомов через пробел"
            class="py-2 px-3 rounded-md text-white flex-1"
          />
  
          <button class="h-10 flex py-2 px-3 fill-white rounded-md hover:bg-neutral-700" type="submit">
            Поиск
          </button>
        </form>
  
        <button
          v-if="filteredValue"
          class="h-10 flex py-2 px-3 fill-white mr-1 rounded-md bg-neutral-800 hover:bg-neutral-700"
          @click="clearSearch"
        >
          Назад
        </button>
      </div>
    </header>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue'
  import { usePhotosStore } from '@/stores/photos'
  
  const photosState = usePhotosStore()
  
  // Реактивная переменная для хранения значения фильтра
  const filteredValue = ref('')
  
  onMounted(() => {
    // применяем квери параметры из url к инпуту для отображения поискового запроса
    const params = new URLSearchParams(window.location.search)
    const albumIds = params.getAll('albumId').filter(id => id !== '')
    if (albumIds.length > 0) {
        filteredValue.value = albumIds.join(' ')
    }
  })

  function updateQuery(event) {
    let ids = event.target.value.replace(/[^0-9\s]/g, '')// Оставляем только числа
        .split(' ').filter(id => id !== '')

    const params = new URLSearchParams(window.location.search)
  
    // Чистим квери параметры
    params.forEach((_, key) => {
      if (key === 'albumId') {
        params.delete(key)
      }
    })
    //добавляем новые
    ids.forEach(id => params.append('albumId', id))
    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`)

    if (!filteredValue.value) {
        clearSearch()
    }
  }
  
  function clearSearch() {
    filteredValue.value = ''
    photosState.photos = []
    window.history.replaceState(null, '', window.location.origin + window.location.pathname)
    photosState.searchAlbum()
  }
</script>