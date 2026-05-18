import request from '@/utils/request'

// 查询物料等级列表
export function listMaterialGrade(query) {
    return request({
        url: '/bas/materialGrade/list',
        method: 'get',
        params: query
    })
}

// 查询物料等级详细
export function getMaterialGrade(id) {
    return request({
        url: '/bas/materialGrade/' + id,
        method: 'get'
    })
}

// 新增物料等级
export function addMaterialGrade(data) {
    return request({
        url: '/bas/materialGrade',
        method: 'post',
        data: data
    })
}

// 修改物料等级
export function updateMaterialGrade(data) {
    return request({
        url: '/bas/materialGrade',
        method: 'put',
        data: data
    })
}

// 删除物料等级
export function delMaterialGrade(id) {
    return request({
        url: '/bas/materialGrade/' + id,
        method: 'delete'
    })
}



