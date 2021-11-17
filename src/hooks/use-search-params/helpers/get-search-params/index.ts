export default function getSearchParams(search: string) {
  const searchParams = search.substr(1) 
  const paramsArr = searchParams.split('&') 
  const params: any = {}
  paramsArr.forEach((pair) => {
    const [key, value] = pair.split('=')
    params[key] = key === 'redirect' ? value.replace('_', '/') : value
  })

  return params
}
