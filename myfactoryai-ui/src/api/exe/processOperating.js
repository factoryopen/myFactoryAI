import request from '@/utils/request'

// 查询产线班组作业列表
export function listProcessOperating(query) {
    return request({
        url: '/exe/processOperating/list',
        method: 'get',
        params: query
    })
}

// 查询产线班组作业详细
export function getProcessOperating(id) {
    return request({
        url: '/exe/processOperating/' + id,
        method: 'get'
    })
}

// 新增产线班组作业
export function addProcessOperating(data) {
    return request({
        url: '/exe/processOperating',
        method: 'post',
        data: data
    })
}

// 修改产线班组作业
export function updateProcessOperating(data) {
    return request({
        url: '/exe/processOperating',
        method: 'put',
        data: data
    })
}

// 删除产线班组作业
export function delProcessOperating(id) {
    return request({
        url: '/exe/processOperating/' + id,
        method: 'delete'
    })
}

// 接收
export function acceptMl(ids)  {
    return request({
        url: '/exe/processOperating/acceptMl/'+ id,
        method: 'put'
    })
}
// 请料
export function requestMaterial(ids)  {
    return request({
        url: '/exe/processOperating/requestMaterial/'+ id,
        method: 'put'
    })
}
// 转出
export function postMl(ids)  {
    return request({
        url: '/exe/processOperating/postMl/'+ id,
        method: 'put'
    })
}
// 开工
export function startWork(data)  {
    return request({
        url: '/exe/processOperating/startWork',
        method: 'put',
        data: data
    })
}
// 完工
export function finishWork(data)  {
    return request({
        url: '/exe/processOperating/finishWork',
        method: 'put',
        data: data
    })
}


