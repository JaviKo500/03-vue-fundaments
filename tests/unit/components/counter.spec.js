import { shallowMount, mount} from '@vue/test-utils'
import Counter  from '@/components/Counter.vue';

describe('Counter component', () => {
    // test( 'to be match with snapshot', () =>{
    //     const wrapper = shallowMount( Counter );
    //     expect( wrapper.html() ).toMatchSnapshot();

    // });
    test( 'h2 debe de tern el valor por defecto de counter', () => {
        const wrapper = shallowMount( Counter );
        expect( wrapper.find('h2').exists() ).toBeTruthy()
        const h2Value = wrapper.find('h2').text();
        // console.log(h2Value.text());
        expect( h2Value  ).toBe('Counter');
    });
});