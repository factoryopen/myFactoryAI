import request from '@/utils/request'

// 查询车间班组作业列表
export function listMlOperating(query) {
    return request({
        url: '/exe/mlOperating/list',
        method: 'get',
        params: query
    })
}

// 查询车间班组作业列表
export function listMlOperatingByOperator(query) {
  return request({
    url: '/exe/mlOperating/listByOperator',
    method: 'get',
    params: query
  })
}

// 查询车间班组作业列表
export function listMlFinishing(query) {
  return request({
    url: '/exe/mlOperating/listFinishing',
    method: 'get',
    params: query
  })
}

// 查询车间班组作业详细
export function getMlOperating(id) {
    return request({
        url: '/exe/mlOperating/' + id,
        method: 'get'
    })
}

// 新增车间班组作业
export function addMlOperating(data) {
    return request({
        url: '/exe/mlOperating',
        method: 'post',
        data: data
    })
}

// 修改车间班组作业
export function updateMlOperating(data) {
    return request({
        url: '/exe/mlOperating',
        method: 'put',
        data: data
    })
}

// 删除车间班组作业
export function delMlOperating(id) {
    return request({
        url: '/exe/mlOperating/' + id,
        method: 'delete'
    })
}

// 接收
export function acceptMl(ids)  {
    return request({
        url: '/exe/mlOperating/acceptMl/'+ ids,
        method: 'put'
    })
}
// 请料
export function requestMaterial(ids)  {
    return request({
        url: '/exe/mlOperating/requestMaterial/'+ ids,
        method: 'put'
    })
}
// 转出
export function postMl(ids)  {
    return request({
        url: '/exe/mlOperating/postMl/'+ ids,
        method: 'put'
    })
}
// 请入库
export function requestStockin(ids)  {
  return request({
    url: '/exe/mlOperating/requestStockin/'+ ids,
    method: 'put'
  })
}
// 结案
export function finishMl(ids)  {
  return request({
    url: '/exe/mlOperating/finishMl/'+ ids,
    method: 'put'
  })
}

// 查询可开工机台
export function listStartableMachine(query) {
  return request({
    url: '/exe/mlOperating/listStartableMachine',
    method: 'get',
    params: query
  })
}
// 开工
export function startWork(data)  {
    return request({
        url: '/exe/mlOperating/startWork',
        method: 'put',
        data: data
    })
}

// 查询待完开工单
export function listUnfinishedWs(query) {
  return request({
    url: '/exe/mlOperating/listUnfinishedWs',
    method: 'get',
    params: query
  })
}
// 完工
export function finishWork(data)  {
    return request({
        url: '/exe/mlOperating/finishWork',
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

