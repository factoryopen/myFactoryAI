import request from '@/utils/request'

// 查询物料分类管理列表
export function listCategory(query) {
    return request({
        url: '/eng/category/list',
        method: 'get',
        params: query
    })
}

// 查询物料分类管理列表
export function listProductCategory(query) {
  return request({
    url: '/eng/category/listProduct',
    method: 'get',
    params: query
  })
}

// 查询物料分类管理列表
export function listPureProductCategory(query) {
  return request({
    url: '/eng/category/listPureProduct',
    method: 'get',
    params: query
  })
}

// 查询物料分类管理列表
export function listMaterialCategory(query) {
  return request({
    url: '/eng/category/listMaterial',
    method: 'get',
    params: query
  })
}

// 查询物料分类管理列表
export function listPureMaterialOrProductCategory(query) {
  return request({
    url: '/eng/category/listPureMaterialOrProduct',
    method: 'get',
    params: query
  })
}

// 查询物料分类管理列表
export function listUtilityCategory(query) {
  return request({
    url: '/eng/category/listUtility',
    method: 'get',
    params: query
  })
}

// 查询物料分类管理详细
export function getCategory(id) {
    return request({
        url: '/eng/category/' + id,
        method: 'get'
    })
}

// 新增物料分类管理
export function addCategory(data) {
    return request({
        url: '/eng/category',
        method: 'post',
        data: data
    })
}

// 修改物料分类管理
export function updateCategory(data) {
    return request({
        url: '/eng/category',
        method: 'put',
        data: data
    })
}

// 删除物料分类管理
export function delCategory(id) {
    return request({
        url: '/eng/category/' + id,
        method: 'delete'
    })
}



