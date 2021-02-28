import {request} from "../server/request"

export function login() {
  return request({
    url: "/home/multidata"
  })
}