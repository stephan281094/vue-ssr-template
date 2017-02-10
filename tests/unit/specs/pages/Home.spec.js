/* global describe, it, expect */
import Vue from 'vue'
import Home from '~pages/Home.vue'

describe('Home page', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h1').textContent)
      .to.equal('Welcome')
  })
})
