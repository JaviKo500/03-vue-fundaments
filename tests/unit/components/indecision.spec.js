import { shallowMount } from "@vue/test-utils";
import Indecision from '@/components/indecision.vue'
import { Promise } from "core-js";
describe('Component', () => {
    let wrapper;
    let clSpy;
    global.fetch = jest.fn( () => Promise.resolve({
        json: () => Promise.resolve({
            answer: "yes",
            forced: false,
            image: "https://yesno.wtf/assets/yes/2.gif"
        })
    }) );
    beforeEach( () => {
        wrapper = shallowMount(Indecision);
        clSpy = jest.spyOn( console, 'log' );
        jest.clearAllMocks();
    });
    test( 'match snapshot', () => expect( wrapper.html() ).toMatchSnapshot());

    test( 'write in input not shot event', async () => {
        const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer' );
        const input = wrapper.find('input');
        await input.setValue('Hello world');
        expect( clSpy ).toHaveBeenCalledTimes(1);
        expect( getAnswerSpy ).not.toHaveBeenCalled();
    });
    
    test( 'write symbol "?" shot getAnswer', async () => {
        const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer' );
        const input = wrapper.find('input');
        await input.setValue('Hello world?');
        expect( getAnswerSpy ).toHaveBeenCalled();

    });

    test( 'test in getAnswer()', async () => {
       await wrapper.vm.getAnswer();
       const img = wrapper.find('img');
       
       //    console.log( wrapper.vm.img );
       //    console.log( wrapper.vm.answer );
       expect( img.exists() ).toBeTruthy();
       expect( wrapper.vm.img ).toBe('https://yesno.wtf/assets/yes/2.gif')
       expect( wrapper.vm.answer ).toBe('Si!')
    });
    
    test( 'test in getAnswer - Failure in API', async () => {
        fetch.mockImplementationOnce( () => Promise.reject('error api is down'));
        await wrapper.vm.getAnswer();
        const img = wrapper.find('img');
        expect( img.exists() ).toBeFalsy();
        expect( wrapper.vm.answer ).toBe('Not load data in API')
    });

});