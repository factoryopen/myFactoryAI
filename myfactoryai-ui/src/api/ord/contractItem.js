import request from '@/utils/request'

// 查询订单明细列表
export function listContractItem(query) {
    return request({
        url: '/ord/contractItem/list',
        method: 'get',
        params: query
    })
}

// 查询订单明细详细
export function getContractItem(id) {
    return request({
        url: '/ord/contractItem/' + id,
        method: 'get'
    })
}

// 新增订单明细
export function addContractItem(data) {
    return request({
        url: '/ord/contractItem',
        method: 'post',
        data: data
    })
}

// 修改订单明细
export function updateContractItem(data) {
    return request({
        url: '/ord/contractItem',
        method: 'put',
        data: data
    })
}

// 删除订单明细
export function delContractItem(ids) {
    return request({
        url: '/ord/contractItem/' + ids,
        method: 'delete'
    })
}

// 分配临时料号
export function requestChildTempProduct(ids)  {
  return request({
    url: '/ord/contractItem/requestTempProduct/'+ ids,
    method: 'put'
  })
}



