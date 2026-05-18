import request from '@/utils/request'

// 查询出入库历史列表
export function listStockReqhistory(query) {
    return request({
        url: '/snc/stockReqhistory/list',
        method: 'get',
        params: query
    })
}

// 查询出入库历史详细
export function getStockReqhistory(id) {
    return request({
        url: '/snc/stockReqhistory/' + id,
        method: 'get'
    })
}

// 新增出入库历史
export function addStockReqhistory(data) {
    return request({
        url: '/snc/stockReqhistory',
        method: 'post',
        data: data
    })
}

// 修改出入库历史
export function updateStockReqhistory(data) {
    return request({
        url: '/snc/stockReqhistory',
        method: 'put',
        data: data
    })
}

// 删除出入库历史
export function delStockReqhistory(id) {
    return request({
        url: '/snc/stockReqhistory/' + id,
        method: 'delete'
    })
}

// 打印
export function printRequest(data)  {
    return request({
        url: '/snc/stockReqhistory/printRequest',
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

