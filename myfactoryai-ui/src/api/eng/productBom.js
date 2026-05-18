import request from '@/utils/request'

// 查询产品BOM列表
export function listProductBom(query) {
    return request({
        url: '/eng/productBom/list',
        method: 'get',
        params: query
    })
}

// 查询产品BOM详细
export function getProductBom(id) {
    return request({
        url: '/eng/productBom/' + id,
        method: 'get'
    })
}

// 新增产品BOM
export function addProductBom(data) {
    return request({
        url: '/eng/productBom',
        method: 'post',
        data: data
    })
}

// 修改产品BOM
export function updateProductBom(data) {
    return request({
        url: '/eng/productBom',
        method: 'put',
        data: data
    })
}

// 删除产品BOM
export function delProductBom(id) {
    return request({
        url: '/eng/productBom/' + id,
        method: 'delete'
    })
}

// 导入BOM
export function importBomExcel(productId, excelUrl) {
  return request({
    url: '/eng/productBom/importExcel4Bom',
    method: 'put',
    params: {'productId':productId,'excelUrl':excelUrl}
  })
}



