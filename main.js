init()


function init() {
  const main = document.querySelector('main')
  
  const pagination1 = new Pagination(DATA.length)
  const pagination2 = new Pagination(DATA.length)
  
  main.prepend(pagination1.wrapperElement)
  main.append(pagination2.wrapperElement)
}