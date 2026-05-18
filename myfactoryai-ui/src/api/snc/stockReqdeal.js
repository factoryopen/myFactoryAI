import request from '@/utils/request'

// 查询请出入库处理列表
export function listStockReqdeal(query) {
    return request({
        url: '/snc/stockReqdeal/list',
        method: 'get',
        params: query
    })
}

// 查询请出入库处理详细
export function getStockReqdeal(id) {
    return request({
        url: '/snc/stockReqdeal/' + id,
        method: 'get'
    })
}

// 新增请出入库处理
export function addStockReqdeal(data) {
    return request({
        url: '/snc/stockReqdeal',
        method: 'post',
        data: data
    })
}

// 修改请出入库处理
export function updateStockReqdeal(data) {
    return request({
        url: '/snc/stockReqdeal',
        method: 'put',
        data: data
    })
}

// 删除请出入库处理
export function delStockReqdeal(id) {
    return request({
        url: '/snc/stockReqdeal/' + id,
        method: 'delete'
    })
}

// 收货
export function receiveMaterial(requestHead, requestItems)  {
  return request({
    url: '/snc/stockReqdeal/receiveMaterial',
    method: 'put',
    params:{'requestId':requestHead.id, 'status':requestHead.status, 'ioType':requestHead.ioType, 'sourceBillNo':requestHead.sourceBillNo},
    //data: {'requestHead':requestHead, 'requestItems':requestItems}
    data:requestItems
  })
}

// 请检
export function requestInspection(data)  {
  return request({
    url: '/snc/stockReqdeal/requestInspection',
    method: 'put',
    data: data
  })
}

// 入库
export function stockIn(id, data)  {
    return request({
        url: '/snc/stockReqdeal/stockIn/'+ id,
        method: 'put',
        data: data
    })
}

// 出库
export function stockout(id, data)  {
    return request({
        url: '/snc/stockReqdeal/stockout/'+ id,
        method: 'put',
        data: data
    })
}

// 入库建议
export function gmgwSuggest(data)  {
  return request({
    url: '/snc/stockReqdeal/gmgwSuggest',
    method: 'put',
    data: data
  })
}

// 出库建议
export function fifoSuggest(data)  {
  return request({
    url: '/snc/stockReqdeal/fifoSuggest',
    method: 'put',
    data: data
  })
}

// 变更
export function normalizeCode(data)  {
  return request({
    url: '/snc/stockReqdeal/normalizeCode',
    method: 'put',
    data: data
  })
}

// 生成采购料号
export function generateMaterialCode(data)  {
  return request({
    url: '/snc/stockReqdeal/generateMaterialCode',
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

