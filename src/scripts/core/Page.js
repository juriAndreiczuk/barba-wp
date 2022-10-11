class Page {
  constructor(pageName, beforeEnter, afterEnter, beforeLeave) {
    this.namespace = pageName
    this.beforeEnterFunction = beforeEnter
    this.afterEnterFunction = afterEnter
    this.beforeLeaveFunction = beforeLeave
  }

  firstLoading() {
    gsap.timeline()
      .to('.site', { opacity: 1 })
  }

  beforeEnter() {
    window.scrollTo({ top: 0, behavior: 'instant' })
    this.beforeEnterFunction()
  }

  afterEnter() {
    setTimeout(()=> {
      gsap.timeline().to('.site-content', { opacity: 1 })
      this.afterEnterFunction()
    }, 0)
  }

  beforeLeave() {
    gsap.timeline().to('.site-content', { opacity: 0 })
    this.beforeLeaveFunction()
  }

  produce() {
    return new Page(this.namespace, () => false, () => false, () => false)
  }
}

export const prototypePage = new Page('prototype')
