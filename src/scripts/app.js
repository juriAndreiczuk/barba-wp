import barba from '@barba/core'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import appState from './core/AppState'
import { prototypePage } from './core/Page'
import { emitter } from './core/Emitter'
import { delay } from './core/utils'

gsap.registerPlugin(ScrollTrigger)
window.ScrollTrigger = ScrollTrigger
window.gsap = gsap

class App {
  constructor() {
    this.appStart()
  }

  async appStart() {
    await appState.setPosts('posts')
    barba.init({
      sync: true,
      debug: true,
      transitions: [
        {
          async leave(data) {
            await delay(300)
            emitter.emit('changePage', data.next.namespace)
          },
          async once(data) {
            await delay(300)
            emitter.emit('changePage', data.next.namespace)
            prototypePage.firstLoading()
          }
        }
      ],
      views: appState.pages
    })
  }
}

const app = new App()
