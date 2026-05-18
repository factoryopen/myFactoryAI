import request from '@/utils/request'

// 查询工单工具列表
export function listWoRoutingtool(query) {
    return request({
        url: '/pln/woRoutingtool/list',
        method: 'get',
        params: query
    })
}

// 查询工单工具详细
export function getWoRoutingtool(id) {
    return request({
        url: '/pln/woRoutingtool/' + id,
        method: 'get'
    })
}

// 新增工单工具
export function addWoRoutingtool(data) {
    return request({
        url: '/pln/woRoutingtool',
        method: 'post',
        data: data
    })
}

// 修改工单工具
export function updateWoRoutingtool(data) {
    return request({
        url: '/pln/woRoutingtool',
        method: 'put',
        data: data
    })
}

// 删除工单工具
export function delWoRoutingtool(id) {
    return request({
        url: '/pln/woRoutingtool/' + id,
        method: 'delete'
    })
}



