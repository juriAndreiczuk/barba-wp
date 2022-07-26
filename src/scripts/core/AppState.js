import { emitter } from './Emitter'
// modules
import Header from './../modules/Header'
import Footer from './../modules/Footer'
// pages
import Error from './../pages/Error'
import Homepage from './../pages/Homepage'
import posts from './../pages/posts'

class AppState {
  constructor() {
    this.currentPage = ''
    emitter.subscribe('changePage', val => {  this.currentPage = val })
    this.pages = [ Error, Homepage ]
    this.templates = { posts }
    this.header = new Header('.header')
    this.footer = new Footer('.footer')
  }

  async setPosts(val) {
    const response = await fetch(`${location.protocol}//${location.host}/wp-json/wp/v2/${val}/?per_page=100`)
    const postsList = await response.json()
    this[val] = this.templates[val](postsList.map(post => post.id))
    this.pages.push(...this[val]) 
  }
}

const appState = new AppState()

export default appState
