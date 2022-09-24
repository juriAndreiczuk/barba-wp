export default class Footer {
  constructor() {
    this.mainWrap = document.querySelector('.site-footer')
  }

  hideAnimation() {
    gsap.timeline()
      .to(this.mainWrap, { opacity: 0 })
  }

  showAnimation() {
    gsap.timeline()
      .to(this.mainWrap, { opacity: 1 })
  }
}
