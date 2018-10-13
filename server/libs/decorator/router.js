export const routerMap = new Map()

const normalizePath = (path) => {
  return path.startsWith('/') ? path : `/${path}`
}

const baseMethod = (conf) => {
  return (target, key) => {
    target[key].prototype.method = conf.method
    conf.path = normalizePath(conf.path)
    conf.target = target
    routerMap.set(conf, target[key])
  }
}

// decorator
export const controller = (path) => {
  return (target) => {
    path = normalizePath(path)
    target.prototype.routerPrefix = path
  }
}

export const get = (path) => {
  return baseMethod({
    method: 'get',
    path
  })
}

export const post = (path) => {
  return baseMethod({
    method: 'post',
    path
  })
}

export const put = (path) => {
  return baseMethod({
    method: 'put',
    path
  })
}

export const del = (path) => {
  return baseMethod({
    method: 'del',
    path
  })
}

export const all = (path) => {
  return baseMethod({
    method: 'all',
    path
  })
}
