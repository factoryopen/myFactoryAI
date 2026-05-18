import request from '@/utils/request'

// 查询采购计划列表
export function listPurchasingPlan(query) {
    return request({
        url: '/sup/purchasingPlan/list',
        method: 'get',
        params: query
    })
}

// 查询采购计划详细
export function getPurchasingPlan(id) {
    return request({
        url: '/sup/purchasingPlan/' + id,
        method: 'get'
    })
}

// 新增采购计划
export function addPurchasingPlan(data) {
    return request({
        url: '/sup/purchasingPlan',
        method: 'post',
        data: data
    })
}

// 修改采购计划
export function updatePurchasingPlan(data) {
    return request({
        url: '/sup/purchasingPlan',
        method: 'put',
        data: data
    })
}

// 修改采购计划
export function splitPurchasingPlan(data) {
  return request({
    url: '/sup/purchasingPlan/split',
    method: 'put',
    data: data
  })
}

// 删除采购计划
export function delPurchasingPlan(id) {
    return request({
        url: '/sup/purchasingPlan/' + id,
        method: 'delete'
    })
}

// 启用
export function enable(id)  {
    return request({
        url: '/sup/purchasingPlan/enable/'+ id,
        method: 'put'
    })
}
// 转单
export function toPo(ids, data)  {
    return request({
        url: '/sup/purchasingPlan/toPo/'+ ids,
        method: 'put',
        data: data
    })
}
// 冻结
export function froze(id)  {
    return request({
        url: '/sup/purchasingPlan/froze/'+ id,
        method: 'put'
    })
}
// 解冻
export function unfroze(id)  {
    return request({
        url: '/sup/purchasingPlan/unfroze/'+ id,
        method: 'put'
    })
}
// 停用
export function disable(id)  {
    return request({
        url: '/sup/purchasingPlan/disable/'+ id,
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

