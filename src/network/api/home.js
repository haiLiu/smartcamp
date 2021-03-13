import {request} from "../server/request"

/* 左侧菜单栏按钮列表 */
export function menuList() {
  return request({
    method: "get",
    url: "menus"
  })
}

