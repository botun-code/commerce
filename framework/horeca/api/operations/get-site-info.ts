import { OperationContext } from '@commerce/api/operations'
import { Category } from '@commerce/types/site'
import { normalizeCategory } from '@framework/lib/normalize'
import { HorecaCategory } from '@framework/types/site'
import { routes } from '@framework/api/endpoints/catalog/products'
import { LocalConfig } from '../index'

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: any[]
  }
> = T

export default function getSiteInfoOperation({ commerce }: OperationContext<any>) {
  async function getSiteInfo({
    query,
    variables,
    config,
  }: {
    query?: string
    variables?: any
    config?: Partial<LocalConfig>
    preview?: boolean
  } = {}): Promise<GetSiteInfoResult> {
    const cnf = commerce.getConfig(config)

    const {data} = await cnf.storeApiFetch(routes.categoriesApiRoute)

    const categories = data.map((v: HorecaCategory) => normalizeCategory(v));
    
    return Promise.resolve({
      categories,
      brands: [],
    })
  }

  return getSiteInfo
}
