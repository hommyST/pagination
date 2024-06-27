class Pagination {
  constructor(len) {
    this.currentPage = 1
    this._len = len
    this._elementsPerPage = 10
    this.wrapperElement = null
    this.totalPage = Math.ceil(len / this._elementsPerPage)
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
      this.compute()
      this.changeActiveClass(btn)
    })
  }

  changeCurrentPage(id) {
    if ('prev'  === id) this.currentPage--
    else if ('next'  === id) this.currentPage++
    else this.currentPage = Number(id)
  }

  compute() {
    let prevBtn = this.wrapperElement.querySelector('[data-pagination-id="prev"]')
    let nextBtn = this.wrapperElement.querySelector('[data-pagination-id="next"]')

    let numBtns = [...this.wrapperElement.querySelectorAll('[data-pagination^="button-"]')]

    if (this.currentPage <= 1) {
      this.currentPage = 1
      prevBtn.setAttribute('disabled', '')
    } else if (this.currentPage >= this.totalPage) {
      this.currentPage = this.totalPage
      nextBtn.setAttribute('disabled', '')
    } else {
      prevBtn.removeAttribute('disabled')
      nextBtn.removeAttribute('disabled')
    }

    if (this.currentPage < this.totalPage - 1 && this.currentPage > 2) {
      numBtns.forEach((btn, index) => {
        if (index === 0 || index === 4) return // Первая и последняя кнопка НЕ меняются

        if (index === 1) {
          btn.textContent = this.currentPage - 1
          btn.dataset.paginationId = this.currentPage - 1
        } else if (index === 2) {
          btn.textContent = this.currentPage
          btn.dataset.paginationId = this.currentPage
        } else if (index === 3) {
          btn.textContent = this.currentPage + 1
          btn.dataset.paginationId = this.currentPage + 1
        }
      })
    } else if (this.currentPage === 1) {
      numBtns.forEach((btn, index) => {
        if (index === 0 || index === 4) return // Первая и последняя кнопка НЕ меняются

        if (index === 1) {
          btn.textContent = 2
          btn.dataset.paginationId = 2
        } else if (index === 2) {
          btn.textContent = 3
          btn.dataset.paginationId = 3
        } else if (index === 3) {
          btn.textContent = 4
          btn.dataset.paginationId = 4
        }
      })
    } else if (this.currentPage === this.totalPage) {
      numBtns.forEach((btn, index) => {
        if (index === 0 || index === 4) return // Первая и последняя кнопка НЕ меняются

        if (index === 1) {
          btn.textContent = this.totalPage - 3
          btn.dataset.paginationId = this.totalPage - 3
        } else if (index === 2) {
          btn.textContent = this.totalPage - 2
          btn.dataset.paginationId = this.totalPage - 2
        } else if (index === 3) {
          btn.textContent = this.totalPage - 1
          btn.dataset.paginationId = this.totalPage - 1
        }
      })
    }


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
    btn5.dataset.paginationId = this.totalPage
    btnNext.dataset.paginationId = 'next'

    btnPrev.textContent = '<'
    btn1.textContent = '1'
    btn2.textContent = '2'
    btn3.textContent = '3'
    btn4.textContent = '4'
    btn5.textContent = this.totalPage
    btnNext.textContent = '>'

    wrap.append(btnPrev, btn1, btn2, btn3, btn4, btn5, btnNext)
    this.wrapperElement = wrap


    // btn3.setAttribute('disabled', '')
    // btn3.removeAttribute('disabled')
  }
}