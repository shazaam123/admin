import { shallowMount } from '@vue/test-utils';
import MyComponent from '@/components/MyComponent.vue';

describe('MyComponent.vue', () => {
  it('renders a message', () => {
    const wrapper = shallowMount(MyComponent);
    expect(wrapper.text()).toMatch('Hello, world!');
  });
});
