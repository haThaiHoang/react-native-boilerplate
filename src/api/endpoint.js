import Request from '@/utils/request'
import Config from '@/configs/develop.json'

const endpoint = `${Config.API_URL}`

const MainApi = Request.create({
  endpoint,
  handleToken: true
})

export { MainApi }
