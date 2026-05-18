import request from '@/utils/request'

// 查询产成品管理列表
export function listProductBasis(query) {
    return request({
        url: '/eng/productBasis/list',
        method: 'get',
        params: query
    })
}

// 查询产成品管理详细
export function getProductBasis(id) {
    return request({
        url: '/eng/productBasis/' + id,
        method: 'get'
    })
}

// 新增产成品管理
export function addProductBasis(data) {
    return request({
        url: '/eng/productBasis',
        method: 'post',
        data: data
    })
}

// 修改产成品管理
export function updateProductBasis(data) {
    return request({
        url: '/eng/productBasis',
        method: 'put',
        data: data
    })
}

// 删除产成品管理
export function delProductBasis(id) {
    return request({
        url: '/eng/productBasis/' + id,
        method: 'delete'
    })
}

// 导入产成品
export function importExcel(excelUrl) {
  return request({
    url: '/eng/productBasis/importExcel',
    method: 'put',
    params: {'excelUrl':excelUrl}
  })
}



