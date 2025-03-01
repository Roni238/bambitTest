<template>
  <div class="max-w-150 max-h-150 overflow-y-scroll custom-scrollbar">
    <table class="w-full max-w-150 max-h-150 border-collapse text-left text-sm text-gray-500">
      <thead class="bg-neutral-800 text-white sticky top-0">
        <template v-if="photosState.photos[0]">
          <tr>
            <th
              v-for="key in theadTitle"
              :key="key"
              class="p-3 border-b border-neutral-950 truncate-text"
            >
              {{ key }}
            </th>
          </tr>
        </template>

        <template v-else>
          <tr>
            <th
              v-for="i in 5"
              :key="i"
              class="p-3 border-b border-neutral-950"
            >
              <div class="w-full rounded bg-gray-300 h-8 animate-pulse shadow-md" />
            </th>
          </tr>
        </template>
      </thead>

      <tbody>
        <template v-if="photosState.photos[0]">
          <tr
            v-for="photo in photosState.photos"
            :key="photo.id"
            class="bg-neutral-700 text-gray-300 hover:bg-neutral-400 hover:text-neutral-950"
          >
            <td
              v-for="(value, key) in photo"
              :key="key"
              class="p-3 border-b border-neutral-950 truncate-text"
              :title="value"
            >
              {{ value }}
            </td>
          </tr>
        </template>

        <template v-else>
          <tr v-for="i in 30" :key="i" class="bg-neutral-700">
            <td colspan="5" class="p-2 border-b border-neutral-950">
              <div class="w-full rounded bg-gray-300 h-8 animate-pulse shadow-md" />
            </td>
          </tr>
        </template>

        <tr class="bg-neutral-700" v-if="!photosState.serach">
          <td colspan="5" class="p-3">
            <Observer
              class="w-full rounded bg-gray-300 h-8 animate-pulse shadow-md"
              :action="photosState.fetchPhoto"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { usePhotosStore } from '@/stores/photos';
import { onMounted } from 'vue';
import Observer from '@/components/UI/Observer.vue';

const photosState = usePhotosStore()

const theadTitle = ['Ид', 'Альбом', 'Название', 'Ссылка', 'Миниатюра']

onMounted(() => {
  photosState.searchAlbum()
})
</script>

<style lang="scss" scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #d4d4d4 #27272a;

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d4d4d4;
    border-radius: 20px;
    border: 1px solid #27272a;
  }

  &::-webkit-scrollbar-track {
    background-color: #27272a;
    border-radius: 4px;
  }
}

/* чтобы не дублировать стлили для ечеек создам отдельный класс обрезающий текст (лкчше сделать глобальную scss миксину и передавать параметр максимального размера, но тут хватит и этого)*/
.truncate-text {
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>