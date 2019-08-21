import Request from '@/utils/request'
import Config from '@/configs/develop.json'

const endpoint = `${Config.API_URL}`

const TokenApi = Request.create({
  endpoint,
  handleToken: true
})

export { TokenApi }
