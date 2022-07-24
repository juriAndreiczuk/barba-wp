import { emitter } from '../core/Emitter'

class Header {
  constructor() {
    this.mainWrap = document.querySelector('.header')
    this.navLinks = this.mainWrap.querySelectorAll('a')
    emitter.subscribe('changePage', val => {
      this.toggleMod(val)
    })
  }

  toggleMod(val) {
    const currentModification = (this.mainWrap.className)
      .split(' ')
      .filter(item => item.indexOf('--') !== -1)
    if (currentModification.length) {
      this.mainWrap.classList.remove(currentModification[0])
    }
    this.mainWrap.classList.add(`header--${val}`)
    this.searchCurrentPageLink()
  }

  searchCurrentPageLink() {
    for (const link of this.navLinks) {
      if (location.href.indexOf(link.href) !== -1) {
        link.classList.add('active-link')
      } else {
        link.classList.remove('active-link')
      }
    }
  }
}

const mainHeader = new Header();

export default mainHeader
