export default class Page {
  constructor(props) {
    this.namespace = props.pageName
    this.beforeEnterFunction = props.beforeEnter
    this.afterEnterFunction = props.afterEnter
    this.beforeLeaveFunction = props.beforeLeave || function() { return false}
  }

  static firstLoading() {
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
}
