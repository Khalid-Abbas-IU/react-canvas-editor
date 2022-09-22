import { render, screen} from '@testing-library/react';
import MainSection from "../index";


describe('Main Section component',()=>{

    //TODO: You can add more test cases here.

    test('Component render correctly', ()=>{
        render(<MainSection/>)
        const resultElement = screen.getByTestId('mainSection')
        expect(resultElement).toBeInTheDocument()
    })
})
