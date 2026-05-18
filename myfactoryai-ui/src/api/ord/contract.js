import request from '@/utils/request'

// 查询订单登记发布列表
export function  listContract(query) {
    return request({
        url: '/ord/contract/list',
        method: 'get',
        params: query
    })
}

// 查询订单登记发布列表
export function  listContractDraft(query) {
  return request({
    url: '/ord/contract/listDraft',
    method: 'get',
    params: query
  })
}

// 查询订单登记发布列表
export function  listContractPublishing(query) {
  return request({
    url: '/ord/contract/listPublishing',
    method: 'get',
    params: query
  })
}

// 查询订单登记发布列表
export function  listContractProcessing(query) {
  return request({
    url: '/ord/contract/listProcessing',
    method: 'get',
    params: query
  })
}

// 查询订单登记发布列表
export function  listContractFinishing(query) {
  return request({
    url: '/ord/contract/listFinishing',
    method: 'get',
    params: query
  })
}

// 查询订单登记发布列表
export function  listContractHistory(query) {
  return request({
    url: '/ord/contract/listHistory',
    method: 'get',
    params: query
  })
}

// 查询订单登记发布列表
export function  listContractAll(query) {
  return request({
    url: '/ord/contract/listHistory',
    method: 'get',
    params: query
  })
}

// 查询订单登记发布列表
export function  listContract4Adult(query) {
  return request({
    url: '/ord/contract/listAdult',
    method: 'get',
    params: query
  })
}

// 查询订单登记发布详细
export function getContract(id) {
    return request({
        url: '/ord/contract/' + id,
        method: 'get'
    })
}

// 新增订单登记发布
export function addContract(data) {
  return request({
    url: '/ord/contract',
    method: 'post',
    data: data
  })
}

// 修改订单登记发布
export function updateContract(data) {
  return request({
    url: '/ord/contract',
    method: 'put',
    data: data
  })
}

// 删除订单登记发布
export function delContract(id) {
  return request({
    url: '/ord/contract/' + id,
    method: 'delete'
  })
}

// 发布
export function enable(id)  {
  return request({
    url: '/ord/contract/enable/'+ id,
    method: 'put'
  })
}

// 冻结
export function toSo(ids)  {
  return request({
    url: '/ord/contract/toSo/'+ ids,
    method: 'put'
  })
}
// 变更
export function changeOrdContract(data)  {
  return request({
    url: '/ord/contract/changeOrdContract',
    method: 'put',
    data: data
  })
}
// 结案
export function finish(ids)  {
  return request({
    url: '/ord/contract/finish/'+ ids,
    method: 'put'
  })
}
// 冻结
export function froze(ids)  {
  return request({
    url: '/ord/contract/froze/'+ ids,
    method: 'put'
  })
}
// 解冻
export function unfroze(ids)  {
  return request({
    url: '/ord/contract/unfroze/'+ ids,
    method: 'put'
  })
}
// 停用
export function disable(id)  {
  return request({
    url: '/ord/contract/disable/'+ id,
    method: 'put'
  })
}
// 强结
export function finishforcely(id)  {
  return request({
    url: '/ord/contract/finishforcely/'+ id,
    method: 'put'
  })
}

// 分配临时料号
export function requestMasterTempProduct(data)  {
  return request({
    url: '/ord/contract/requestTempProduct',
    method: 'put',
    data: data
  })
}

// 导入合同
export function importExcel(excelUrl) {
  return request({
    url: '/ord/contract/importExcel',
    method: 'put',
    params: {'excelUrl':excelUrl}
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
