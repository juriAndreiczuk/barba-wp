import { emitter } from './Emitter'
// modules
import Header from './../modules/Header'
import Footer from './../modules/Footer'
// pages
import Error from './../pages/Error'
import Homepage from './../pages/Homepage'
import Posts from './../templates/Posts'

class AppState {
  constructor() {
    if (typeof AppState.instance === 'object')  {
      return AppState.instance
    }

    this.currentPage = ''
    emitter.subscribe('changePage', val => {  this.currentPage = val })
    this.pages = [ Error, Homepage, Posts ]
    this.header = new Header('.header')
    this.footer = new Footer('.footer')

    AppState.instance = this
  }
}

const appState = new AppState()

export default appState
