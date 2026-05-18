import request from '@/utils/request'

// 查询批次工具列表
export function listMlRoutingtool(query) {
    return request({
        url: '/pln/mlRoutingtool/list',
        method: 'get',
        params: query
    })
}

// 查询批次工具详细
export function getMlRoutingtool(id) {
    return request({
        url: '/pln/mlRoutingtool/' + id,
        method: 'get'
    })
}

// 新增批次工具
export function addMlRoutingtool(data) {
    return request({
        url: '/pln/mlRoutingtool',
        method: 'post',
        data: data
    })
}

// 修改批次工具
export function updateMlRoutingtool(data) {
    return request({
        url: '/pln/mlRoutingtool',
        method: 'put',
        data: data
    })
}

// 删除批次工具
export function delMlRoutingtool(id) {
    return request({
        url: '/pln/mlRoutingtool/' + id,
        method: 'delete'
    })
}



