import Request from '@/utils/request'
import Configs from '@/configs'

// Edit the suffix base on the version of your server API
const endpoint = `${Configs.API_URL}/api/v1`

// Endpoint that using to access server APIs
const MainApi = Request.create({
  endpoint,
  handleToken: true
})

// Endpoint that using to access external APIs
const ExternalApi = Request.create({
  endpoint: ''
})

export { MainApi, ExternalApi }
