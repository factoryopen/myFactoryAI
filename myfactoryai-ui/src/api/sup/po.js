import request from '@/utils/request'

// 查询采购单管理列表
export function listPo(query) {
    return request({
        url: '/sup/po/list',
        method: 'get',
        params: query
    })
}

// 查询采购单管理列表
export function listPoDraft(query) {
  return request({
    url: '/sup/po/listDraft',
    method: 'get',
    params: query
  })
}

// 查询采购单管理列表
export function listPoPublishing(query) {
  return request({
    url: '/sup/po/listPublishing',
    method: 'get',
    params: query
  })
}

// 查询采购单管理列表
export function listPoProcessing(query) {
  return request({
    url: '/sup/po/listProcessing',
    method: 'get',
    params: query
  })
}

// 查询采购单管理列表
export function listPoFinishing(query) {
  return request({
    url: '/sup/po/listFinishing',
    method: 'get',
    params: query
  })
}

// 查询采购单管理列表
export function listPoHistory(query) {
  return request({
    url: '/sup/po/listHistory',
    method: 'get',
    params: query
  })
}

// 查询采购单管理列表
export function listPoAll(query) {
  return request({
    url: '/sup/po/listAll',
    method: 'get',
    params: query
  })
}

// 查询采购单管理详细
export function getPo(id) {
    return request({
        url: '/sup/po/' + id,
        method: 'get'
    })
}

// 新增采购单管理
export function addPo(data) {
    return request({
        url: '/sup/po',
        method: 'post',
        data: data
    })
}

// 修改采购单管理
export function updatePo(data) {
    return request({
        url: '/sup/po',
        method: 'put',
        data: data
    })
}

// 删除采购单管理
export function delPo(id) {
    return request({
        url: '/sup/po/' + id,
        method: 'delete'
    })
}

// 发放
export function enable(id)  {
    return request({
        url: '/sup/po/enable/'+ id,
        method: 'put'
    })
}
// 变更
export function changeSupPo(data)  {
    return request({
        url: '/sup/po/changeSupPo',
        method: 'put',
        data: data
    })
}
// 冻结
export function froze(ids)  {
    return request({
        url: '/sup/po/froze/'+ ids,
        method: 'put'
    })
}
// 解冻
export function unfroze(ids)  {
    return request({
        url: '/sup/po/unfroze/'+ ids,
        method: 'put'
    })
}
// 停用
export function disable(ids)  {
    return request({
        url: '/sup/po/disable/'+ ids,
        method: 'put'
    })
}
// 解冻
export function finish(ids)  {
  return request({
    url: '/sup/po/finish/'+ ids,
    method: 'put'
  })
}

// 通知收货
export function noticeReceiving(data)  {
    return request({
        url: '/sup/po/noticeReceiving',
        method: 'put',
        data: data
    })
}

// 通知退货
export function noticeReturning(data)  {
  return request({
    url: '/sup/po/noticeReturning',
    method: 'put',
    data: data
  })
}

// 放弃退货
export function ignoreReturning(data)  {
  return request({
    url: '/sup/po/ignoreReturning',
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

