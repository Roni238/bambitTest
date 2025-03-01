import { defineStore } from 'pinia'

export const usePhotosStore = defineStore('counter', {
  state: () => ({
    photos: []
  }),
  actions: {
    formattingPhotos(obj){
      const defaultObj = {
        id: obj.id,
        albumId: obj.albumId,
        title: obj.title,
        url: obj.url,
        thumbnailUrl: obj.thumbnailUrl
      }
      return defaultObj
    },
    async fetchPhoto(){
      try {
        const url = this.photos.length === 0 
          ? 'https://jsonplaceholder.typicode.com/photos?_limit=30' 
          : `https://jsonplaceholder.typicode.com/photos?_start=${this.photos.length}&_limit=20`

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Ошибка при получении данных: ${response.status}`)
        }
        
        const newPhotos = await response.json()
        this.photos = [...this.photos, ...newPhotos.map(obj =>this.formattingPhotos(obj))]
      } catch (error) {
        console.error(error)
      }
    },
    async searchAlbum(){
      try {
        let paramsReq = null
        const queryParams = new URLSearchParams(window.location.search)
        const albumIds = queryParams.getAll('albumId').filter(id => !isNaN(parseInt(id))) // удаляем не числа из albumId

        if(albumIds[0]){
          //если квери параметры есть то параметры для запроса применим из url
          paramsReq = albumIds.join(' ').split(' ').map(id => `albumId=${id}`)
        }

        // если параметры для запроса есть то делаем запрос, если нет грузим фото
        if(paramsReq){
          const response = await fetch(`https://jsonplaceholder.typicode.com/photos?${paramsReq.join('&')}`)
           const data = await response.json()
           this.photos = data.map(obj =>this.formattingPhotos(obj))
        }else{
          this.fetchPhoto()
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
})