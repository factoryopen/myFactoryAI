import request from '@/utils/request'

// 查询订单登记发布列表
export function listSo(query) {
    return request({
        url: '/ord/so/list',
        method: 'get',
        params: query
    })
}

// 查询订单登记发布列表
export function listSoDraft(query) {
  return request({
    url: '/ord/so/listDraft',
    method: 'get',
    params: query
  })
}

// 查询订单登记发布列表
export function listSoPublishing(query) {
  return request({
    url: '/ord/so/listPublishing',
    method: 'get',
    params: query
  })
}

// 查询订单登记发布列表
export function listSoProcessing(query) {
  return request({
    url: '/ord/so/listProcessing',
    method: 'get',
    params: query
  })
}

// 查询订单登记发布列表
export function listSoFinishing(query) {
  return request({
    url: '/ord/so/listFinishing',
    method: 'get',
    params: query
  })
}

// 查询订单登记发布列表
export function listSoHistory(query) {
  return request({
    url: '/ord/so/listHistory',
    method: 'get',
    params: query
  })
}

// 查询订单登记发布列表
export function listSoAll(query) {
  return request({
    url: '/ord/so/listHistory',
    method: 'get',
    params: query
  })
}

// 查询订单登记发布列表
export function listSo4Adult(query) {
  return request({
    url: '/ord/so/listAdult',
    method: 'get',
    params: query
  })
}

// 查询订单登记发布详细
export function getSo(id) {
    return request({
        url: '/ord/so/' + id,
        method: 'get'
    })
}

// 修改订单明细
export function importExcel(excelUrl) {
  return request({
    url: '/ord/so/importExcel',
    method: 'put',
    params: {'excelUrl':excelUrl}
  })
}

// 新增订单登记发布
export function addSo(data) {
    return request({
        url: '/ord/so',
        method: 'post',
        data: data
    })
}

// 修改订单登记发布
export function updateSo(data) {
    return request({
        url: '/ord/so',
        method: 'put',
        data: data
    })
}

// 删除订单登记发布
export function delSo(id) {
    return request({
        url: '/ord/so/' + id,
        method: 'delete'
    })
}

// 发布
export function enable(id)  {
    return request({
        url: '/ord/so/enable/'+ id,
        method: 'put'
    })
}
// 变更
export function changeOrdSo(data)  {
    return request({
        url: '/ord/so/changeOrdSo',
        method: 'put',
        data: data
    })
}
// 结案
export function finish(ids)  {
  return request({
    url: '/ord/so/finish/'+ ids,
    method: 'put'
  })
}
// 冻结
export function froze(ids)  {
    return request({
        url: '/ord/so/froze/'+ ids,
        method: 'put'
    })
}
// 解冻
export function unfroze(ids)  {
    return request({
        url: '/ord/so/unfroze/'+ ids,
        method: 'put'
    })
}
// 停用
export function disable(id)  {
    return request({
        url: '/ord/so/disable/'+ id,
        method: 'put'
    })
}
// 强结
export function finishforcely(id)  {
    return request({
        url: '/ord/so/finishforcely/'+ id,
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

