import Vue from 'vue'

function OpmlToJson(xmlFile:string) {
  const xml = Vue.prototype.$x2js.xml2js(xmlFile)
  for (const op in xml) {
    if (op === 'opml') {
      const ops = xml[op]
      for (const body in ops) {
        if (body === 'body') {
          return transtlateTOJson(ops[body].outline, -1)
        }
      }
    }
  }
}
function isStringNull(str:string) {
  return str !== undefined && str !== null && str !== '' && str.length !== 0
}

function transtlateTOJson(outline:any, deepth:number) {
  const res:any = {}
  for (const coutline in outline) {
    const obj = outline[coutline]
    if (coutline === 'outline') {
      const child:any = [obj.length]
      if (obj instanceof Array) {
        for (const i in obj) {
          child[i] = transtlateTOJson(obj[i], deepth)
        }
      } else {
        child[0] = transtlateTOJson(obj, deepth)
      }
      res.children = child
    } else if (coutline === '_text') {
      res.name = obj
    } else if (coutline === '__url') {
      res.link = obj
    }
  }
  return res
}

function readXML(filePath:string) {
  // 创建一个新的xhr对象
  let xhr = null
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else {
    // IE
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }
  xhr.open('GET', filePath, false)
  xhr.overrideMimeType('text/html;charset=utf-8')
  xhr.send(null)
  console.log(xhr.responseText.replace(/\s*/g, ''))
  return xhr.responseText.replace(/\s*/g, '')
}
export {
  readXML,
  OpmlToJson,
  isStringNull,
}
