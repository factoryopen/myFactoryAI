import request from '@/utils/request'

// 查询产成品列表
export function listProduct(query) {
    return request({
        url: '/eng/material/listProduct',
        method: 'get',
        params: query
    })
}

// 查询产成品列表
export function listPureProduct(query) {
  return request({
    url: '/eng/material/listPureProduct',
    method: 'get',
    params: query
  })
}

// 查询外购料列表
export function listMaterial(query) {
  return request({
    url: '/eng/material/listMaterial',
    method: 'get',
    params: query
  })
}

// 查询外购料列表
export function listPureMaterialOrProduct(query) {
  return request({
    url: '/eng/material/listPureMaterialOrProduct',
    method: 'get',
    params: query
  })
}

// 查询外购料列表
export function listUtility(query) {
  return request({
    url: '/eng/material/listUtility',
    method: 'get',
    params: query
  })
}

// 查询外购料列表
export function listInventory(query) {
  return request({
    url: '/eng/material/listInventory',
    method: 'get',
    params: query
  })
}

// 查询外购料管理详细
export function getMaterial(id) {
    return request({
        url: '/eng/material/' + id,
        method: 'get'
    })
}

// 获得下一个料号
export function getNextMaterialCode(prefixCode) {
  return request({
    url: '/eng/material/getNextCode/' + prefixCode,
    method: 'get'
  })
}

// 新增外购料管理
export function addMaterial(data) {
    return request({
        url: '/eng/material',
        method: 'post',
        data: data
    })
}

// 修改外购料管理
export function updateMaterial(data) {
    return request({
        url: '/eng/material',
        method: 'put',
        data: data
    })
}

// 删除外购料管理
export function delMaterial(id) {
    return request({
        url: '/eng/material/' + id,
        method: 'delete'
    })
}

// 导入外购料
export function importExcel(excelUrl) {
  return request({
    url: '/eng/productBasis/importExcel',
    method: 'put',
    params: {'excelUrl':excelUrl}
  })
}



