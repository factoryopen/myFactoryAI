import request from '@/utils/request'

// 查询物料信息列表
export function listMaterialInfo(query) {
    return request({
        url: '/eng/materialInfo/list',
        method: 'get',
        params: query
    })
}

// 查询物料信息列表
export function listPurchasingMaterialInfo(query) {
  return request({
    url: '/eng/materialInfo/listPurchasing',
    method: 'get',
    params: query
  })
}

// 查询物料信息列表
export function listProductingMaterialInfo(query) {
  return request({
    url: '/eng/materialInfo/listProducting',
    method: 'get',
    params: query
  })
}

// 查询物料信息列表
export function filterMaterialList(filter) {
  return request({
    url: '/eng/materialInfo/filterMaterialList',
    method: 'get',
    params: {"filter":filter}
  })
}

// 查询物料信息详细
export function getMaterialInfo(id) {
    return request({
        url: '/eng/materialInfo/' + id,
        method: 'get'
    })
}

// 新增物料信息
export function addMaterialInfo(data) {
    return request({
        url: '/eng/materialInfo',
        method: 'post',
        data: data
    })
}

// 修改物料信息
export function updateMaterialInfo(data) {
    return request({
        url: '/eng/materialInfo',
        method: 'put',
        data: data
    })
}

// 删除物料信息
export function delMaterialInfo(id) {
    return request({
        url: '/eng/materialInfo/' + id,
        method: 'delete'
    })
}



