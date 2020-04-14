import { types } from 'mobx-state-tree'

import { Modal, createTypes } from '@/utils/mobx-model-helper'
import { getProducts } from '@/api/products'

const TYPES = createTypes([
  'GET_PRODUCTS'
])

const Product = types.model('Product')
  .props({
    id: types.identifierNumber,
    avatar: types.maybeNull(types.string),
    name: types.string,
    description: types.maybeNull(types.string)
  })

const ProductsStore = Modal.named('ProductsStore')
  .props({
    products: types.model({
      items: types.array(Product),
      total: types.number
    })
  })
  .actions((self) => ({
    getProducts(payload) {
      return self.request({
        type: TYPES.GET_PRODUCTS,
        api: getProducts,
        payload,
        onSuccess: (result) => {
          self.products = result
        }
      })
    }
  }))

export {
  TYPES
}
export default ProductsStore.create({
  products: {
    item: [],
    total: 0
  }
})