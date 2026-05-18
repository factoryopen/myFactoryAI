import request from '@/utils/request'


// 获取是否显示头像
export function getAvatarEnabled() {
  return request({
    url: '/avatarEnabled',
    method: 'get',
  })
}
