import request from '@/utils/request'

// 查询班制管理列表
export function listShiftsys(query) {
    return request({
        url: '/res/shiftsys/list',
        method: 'get',
        params: query
    })
}

// 查询班制管理详细
export function getShiftsys(id) {
    return request({
        url: '/res/shiftsys/' + id,
        method: 'get'
    })
}

// 新增班制管理
export function addShiftsys(data) {
    return request({
        url: '/res/shiftsys',
        method: 'post',
        data: data
    })
}

// 修改班制管理
export function updateShiftsys(data) {
    return request({
        url: '/res/shiftsys',
        method: 'put',
        data: data
    })
}

// 删除班制管理
export function delShiftsys(id) {
    return request({
        url: '/res/shiftsys/' + id,
        method: 'delete'
    })
}



