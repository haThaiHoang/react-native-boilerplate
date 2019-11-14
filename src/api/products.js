// import { MainApi } from './endpoint'
import mockData from '@/utils/mock-data'

export function getProducts() {
  return mockData({
    success: true,
    result: [{
      id: 1,
      avatar: 'https://image.shutterstock.com/image-photo/red-apple-on-white-background-260nw-158989157.jpg',
      name: 'Apple',
      description: 'Ngon'
    }, {
      id: 2,
      avatar: 'https://suttons.s3.amazonaws.com/p/VECAR14605rt_3.jpg',
      name: 'Carrot',
      description: 'Quá Ngon'
    }, {
      id: 3,
      avatar: 'http://elmatadorrestaurant.com/wp-content/uploads/2017/12/MILK.jpg',
      name: 'Milk',
      description: 'Hơi béo'
    }]
  })
}
