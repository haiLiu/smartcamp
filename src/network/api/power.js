import {request} from "../server/request"

/* 权限列表 */
export function rightsList() {
  return request({
    method: "get",
    url: "rights/list"
  })
}

/* 权限树 */
export function rightsTree() {
  return request({
    method: "get",
    url: "rights/tree"
  })
}

/* 角色列表 */
export function rolesList() {
  return request({
    method: "get",
    url: "roles"
  })
}

/* 删除权限 */
export function deleteRight(roleId,rightId) {
  return request({
    method: "delete",
    url: `roles/${roleId}/rights/${rightId}`
  })
}

/* 给角色添加权限 */
export function assignRight(roleId,data) {
  return request({
    method: "post",
    url: `roles/${roleId}/rights`,
    data: data
  })
}