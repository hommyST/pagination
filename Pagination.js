class Pagination {
  constructor(len) {
    this.currentPage = 1
    this._len = len
    this._elementsPerPage = 10
    this.wrapperElement = null
    this.pageAmount = Math.ceil(len / this._elementsPerPage)
    this.init()
  }

  set len(val) {
    this._len = val
  }
  get len() {
    return this._len
  }

  set elementsPerPage(val) {
    this._elementsPerPage = val
  }
  get elementsPerPage() {
    return this._elementsPerPage
  }

  init() {
    this.build()
    this.clickHandle()
  }

  clickHandle() {
    this.wrapperElement.addEventListener('click', ev => {
      if (ev.target.tagName !== 'BUTTON') return

      let btn = ev.target

      this.changeCurrentPage(btn.dataset.paginationId)
      //todo пересчитать и перерендерить кнопки ТУТ
      this.changeActiveClass(btn)

      // console.log(btn.dataset.paginationId)
    })
  }
  
  changeCurrentPage(id) {
    if ('prev'  === id) this.currentPage--
    else if ('next'  === id) this.currentPage++
    else this.currentPage = Number(id)
  }

  changeActiveClass() {
    Array.from(this.wrapperElement.children).forEach(btn => {
      btn.classList.remove('active')

      if (Number(btn.dataset.paginationId) === this.currentPage) {
        btn.classList.add('active')
      }
    })
  }

  
  build() {
    const wrap = document.createElement('div')

    const btnPrev = document.createElement('button')
    const btn1 = document.createElement('button')
    const btn2 = document.createElement('button')
    const btn3 = document.createElement('button')
    const btn4 = document.createElement('button')
    const btn5 = document.createElement('button')
    const btnNext = document.createElement('button')

    wrap.className = 'pagination'
    btnPrev.className = 'pagenum'
    btn1.className = 'pagenum active'
    btn2.className = 'pagenum'
    btn3.className = 'pagenum'
    btn4.className = 'pagenum'
    btn5.className = 'pagenum'
    btnNext.className = 'pagenum'

    btnPrev.dataset.pagination = 'prev'
    btn1.dataset.pagination = 'button-1'
    btn2.dataset.pagination = 'button-2'
    btn3.dataset.pagination = 'button-3'
    btn4.dataset.pagination = 'button-4'
    btn5.dataset.pagination = 'button-5'
    btnNext.dataset.pagination = 'next'

    btnPrev.dataset.paginationId = 'prev'
    btn1.dataset.paginationId = '1'
    btn2.dataset.paginationId = '2'
    btn3.dataset.paginationId = '3'
    btn4.dataset.paginationId = '4'
    btn5.dataset.paginationId = this.pageAmount
    btnNext.dataset.paginationId = 'next'

    btnPrev.textContent = '<'
    btn1.textContent = '1'
    btn2.textContent = '2'
    btn3.textContent = '3'
    btn4.textContent = '4'
    btn5.textContent = this.pageAmount
    btnNext.textContent = '>'

    wrap.append(btnPrev, btn1, btn2, btn3, btn4, btn5, btnNext)
    this.wrapperElement = wrap


    // btn3.setAttribute('disabled', '')
    // btn3.removeAttribute('disabled')
  }
}