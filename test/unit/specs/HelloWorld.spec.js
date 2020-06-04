import Vue from 'vue';
import DashBoard from '@/components/dashboard/DashBoard';

describe('DashBoard.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(DashBoard);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App');
  });
});
