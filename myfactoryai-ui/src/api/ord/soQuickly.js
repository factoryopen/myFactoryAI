import request from '@/utils/request'

// 查询急出订单列表
export function listSoQuickly(query) {
    return request({
        url: '/ord/soQuickly/list',
        method: 'get',
        params: query
    })
}

// 查询急出订单详细
export function getSoQuickly(id) {
    return request({
        url: '/ord/soQuickly/' + id,
        method: 'get'
    })
}

// 新增急出订单
export function addSoQuickly(data) {
    return request({
        url: '/ord/soQuickly',
        method: 'post',
        data: data
    })
}

// 修改急出订单
export function updateSoQuickly(data) {
    return request({
        url: '/ord/soQuickly',
        method: 'put',
        data: data
    })
}

// 删除急出订单
export function delSoQuickly(id) {
    return request({
        url: '/ord/soQuickly/' + id,
        method: 'delete'
    })
}

// 发布
export function enable(ids)  {
    return request({
        url: '/ord/soQuickly/enable/'+ ids,
        method: 'put'
    })
}
// 便捷订单生生单
export function deliveryDirectly(ids)  {
    return request({
        url: '/ord/soQuickly/deliveryDirectly/'+ ids,
        method: 'put'
    })
}
// 快速发货
export function deliveryQuickly(ids)  {
  return request({
    url: '/ord/soQuickly/deliveryQuickly/'+ ids,
    method: 'put'
  })
}



// 订单号
export function getNextBillno(billCode) {
    return request({
        url: '/tool/billManager/' + billCode,
        method: 'get'
    })
}

export function updateBillSeq(billCode) {
    return request({
        url: '/tool/billManager/' + billCode,
        method: 'put'
    })
}

