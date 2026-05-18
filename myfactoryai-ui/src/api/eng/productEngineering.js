import request from '@/utils/request'

// 查询产品工艺管理列表
export function listProductEngineering(query) {
    return request({
        url: '/eng/productEngineering/list',
        method: 'get',
        params: query
    })
}

// 查询产品工艺管理详细
export function getProductEngineering(id) {
    return request({
        url: '/eng/productEngineering/' + id,
        method: 'get'
    })
}

// 新增产品工艺管理
export function addProductEngineering(data) {
    return request({
        url: '/eng/productEngineering',
        method: 'post',
        data: data
    })
}

// 修改产品工艺管理
export function updateProductEngineering(data) {
    return request({
        url: '/eng/productEngineering',
        method: 'put',
        data: data
    })
}

// 删除产品工艺管理
export function delProductEngineering(id) {
    return request({
        url: '/eng/productEngineering/' + id,
        method: 'delete'
    })
}

// 继承工艺
export function inheritEngineering(id)  {
  return request({
    url: '/eng/productEngineering/inheritEngineering/' + id,
    method: 'get'
  })
}

// 生成采购料号
export function generateCode(data)  {
  return request({
    url: '/eng/productEngineering/generateCode',
    method: 'put',
    data: data
  })
}



