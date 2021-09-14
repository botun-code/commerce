import type { Product } from '../types/product'
import type { Cart, HorecaCart, LineItem } from '../types/cart'
import type { Page } from '../types/page'
import type { Category, HorecaCategory } from '../types/site'
// import { definitions } from '../api/definitions/store-content'
import update from './immutability'
import getSlug from './get-slug'
import { HorecaProduct } from 'framework/horeca/types/product'

function normalizeProductOption(productOption: any) {
  const {
    node: { entityId, values: { edges = [] } = {}, ...rest },
  } = productOption

  return {
    id: entityId,
    values: edges?.map(({ node }: any) => node),
    ...rest,
  }
}

export function normalizeProduct(productNode: HorecaProduct): Product {
  return {
    ...productNode,
    sku: productNode.id, // add sku
    price: {
      value: productNode.price,
      currencyCode: 'UAH',
    },
    variants: [],
    options: [],
  }
}

export function normalizePage(page: any): Page {
  return {
    id: String(page.id),
    name: page.name,
    is_visible: page.is_visible,
    sort_order: page.sort_order,
    body: page.body,
  }
}

export function normalizeCart(data: HorecaCart): Cart {
  return {
    id: data.id,
    customerId: String(data.customer_id),
    email: data.email,
    createdAt: data.created_time,
    currency: data.currency,
    taxesIncluded: data.tax_included,
    lineItems: data.line_items.physical_items.map(normalizeLineItem),
    lineItemsSubtotalPrice: data.base_amount,
    subtotalPrice: data.base_amount + data.discount_amount,
    totalPrice: data.cart_amount,
    discounts: data.discounts?.map((discount) => ({
      value: discount.discounted_amount,
    })),
  }
}

function normalizeLineItem(item: any): LineItem {
  return {
    id: item.id,
    variantId: String(item.variant_id),
    productId: String(item.product_id),
    name: item.name,
    quantity: item.quantity,
    variant: {
      id: String(item.variant_id),
      sku: item.sku,
      name: item.name,
      image: {
        url: item.image_url,
      },
      requiresShipping: item.is_require_shipping,
      price: item.sale_price,
      listPrice: item.list_price,
    },
    path: item.url.split('/')[3],
    discounts: item.discounts.map((discount: any) => ({
      value: discount.discounted_amount,
    })),
  }
}

export function normalizeCategory(category: HorecaCategory): Category {
  return {
    id: `${category._id}`,
    name: category.name,
    slug: category._id,
    path: '/' + category._id,
    description: category.description,
  }
}
