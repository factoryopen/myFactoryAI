import request from '@/utils/request'

// 查询请购审核列表
export function listPurchaseRequestAudit(query) {
    return request({
        url: '/sup/purchaseRequestAudit/list',
        method: 'get',
        params: query
    })
}

// 查询请购审核详细
export function getPurchaseRequestAudit(id) {
    return request({
        url: '/sup/purchaseRequestAudit/' + id,
        method: 'get'
    })
}

// 新增请购审核
export function addPurchaseRequestAudit(data) {
    return request({
        url: '/sup/purchaseRequestAudit',
        method: 'post',
        data: data
    })
}

// 修改请购审核
export function updatePurchaseRequestAudit(data) {
    return request({
        url: '/sup/purchaseRequestAudit',
        method: 'put',
        data: data
    })
}

// 删除请购审核
export function delPurchaseRequestAudit(id) {
    return request({
        url: '/sup/purchaseRequestAudit/' + id,
        method: 'delete'
    })
}

// 过审
export function auditPass(id)  {
    return request({
        url: '/sup/purchaseRequestAudit/auditPass/'+ id,
        method: 'put'
    })
}
// 驳审
export function auditReject(id)  {
    return request({
        url: '/sup/purchaseRequestAudit/auditReject/'+ id,
        method: 'put'
    })
}
// 转计划
export function toPlan(ids)  {
    return request({
        url: '/sup/purchaseRequestAudit/toPlan/'+ ids,
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

