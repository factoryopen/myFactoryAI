import request from '@/utils/request'

// 查询来料收货登记列表
export function listGr(query) {
    return request({
        url: '/snc/gr/list',
        method: 'get',
        params: query
    })
}

// 查询来料收货登记详细
export function getGr(id) {
    return request({
        url: '/snc/gr/' + id,
        method: 'get'
    })
}

// 新增来料收货登记
export function addGr(data) {
    return request({
        url: '/snc/gr',
        method: 'post',
        data: data
    })
}

// 修改来料收货登记
export function updateGr(data) {
    return request({
        url: '/snc/gr',
        method: 'put',
        data: data
    })
}

// 删除来料收货登记
export function delGr(id) {
    return request({
        url: '/snc/gr/' + id,
        method: 'delete'
    })
}

// 发放
export function enable(id)  {
    return request({
        url: '/snc/gr/enable/'+ id,
        method: 'put'
    })
}
// 变更
export function changeSncGr(data)  {
    return request({
        url: '/snc/gr/changeSncGr',
        method: 'put',
        data: data
    })
}
// 冻结
export function froze(id)  {
    return request({
        url: '/snc/gr/froze/'+ id,
        method: 'put'
    })
}
// 解冻
export function unfroze(id)  {
    return request({
        url: '/snc/gr/unfroze/'+ id,
        method: 'put'
    })
}
// 停用
export function disable(id)  {
    return request({
        url: '/snc/gr/disable/'+ id,
        method: 'put'
    })
}
// 入库
export function stockin(data)  {
    return request({
        url: '/snc/gr/stockin',
        method: 'put',
        data: data
    })
}
// 请检
export function requestInspection(data)  {
    return request({
        url: '/snc/gr/requestInspection',
        method: 'put',
        data: data
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

