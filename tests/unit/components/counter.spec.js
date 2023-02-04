import { shallowMount, mount} from '@vue/test-utils'
import Counter  from '@/components/Counter.vue';

describe('Counter component', () => {
    let wrapper;
    beforeEach(() => wrapper = shallowMount( Counter ));

    // test( 'to be match with snapshot', () =>{
    //     const wrapper = shallowMount( Counter );
    //     expect( wrapper.html() ).toMatchSnapshot();

    // });
    test( 'h2 debe de tern el valor por defecto de counter', () => {
        expect( wrapper.find('h2').exists() ).toBeTruthy()
        const h2Value = wrapper.find('h2').text();
        // console.log(h2Value.text());
        expect( h2Value  ).toBe('Counter');
    });

    test( 'default value is 100 in p', () => {
        const value = wrapper.find('[data-test-id="counter"]');
        expect( value.text() ).toBe('100');
    });
    
    test( 'increment in 1 value counter and decrement value in 2', async () => {
        const [increaseBtn, decreaseBtn] = wrapper.findAll('button');
        await increaseBtn.trigger('click');
        const value = wrapper.find('[data-test-id="counter"]');
        expect( value.text() ).toBe('101');
        await decreaseBtn.trigger('click');
        await decreaseBtn.trigger('click');
        expect( value.text() ).toBe('99');
        
    });
    
    test( 'defaults values', async () => {
        const { start } = wrapper.props();
        const value = wrapper.find('[data-test-id="counter"]');
        expect( Number(value.text()) ).toBe(start)
    });
    
    test( 'show prop title', () => {
        const title = 'Test';
        const wrapper = shallowMount( Counter, {
            props: {
                title,
                start: '8'
            }
        } );
        console.log(wrapper.html());
        const h2 = wrapper.find('h2').text();   
        expect( h2 ).toBe( title );
    });
});
