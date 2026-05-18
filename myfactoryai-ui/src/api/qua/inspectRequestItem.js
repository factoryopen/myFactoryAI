import request from '@/utils/request'

// 查询请检列表
export function listInspectRequestItem(query) {
    return request({
        url: '/qua/inspectRequestItem/list',
        method: 'get',
        params: query
    })
}

// 查询请检详细
export function getInspectRequestItem(id) {
    return request({
        url: '/qua/inspectRequestItem/' + id,
        method: 'get'
    })
}

// 新增请检
export function addInspectRequestItem(data) {
    return request({
        url: '/qua/inspectRequestItem',
        method: 'post',
        data: data
    })
}

// 修改请检
export function updateInspectRequestItem(data) {
    return request({
        url: '/qua/inspectRequestItem',
        method: 'put',
        data: data
    })
}

// 删除请检
export function delInspectRequestItem(id) {
    return request({
        url: '/qua/inspectRequestItem/' + id,
        method: 'delete'
    })
}

// 检良
export function registerGoodInspection(id, data)  {
  return request({
    url: '/qua/inspectRequestItem/registerGoodInspection/'+id,
    method: 'put',
    data: data
  })
}

// 检异
export function registerExceptionalInspection(id, data)  {
    return request({
        url: '/qua/inspectRequestItem/registerExceptionalInspection/'+id,
        method: 'put',
        data: data
    })
}

// 请判
export function requestJugde(data)  {
    return request({
        url: '/qua/inspectRequestItem/requestJugde',
        method: 'put',
        data: data
    })
}

