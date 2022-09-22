import { render, screen} from '@testing-library/react';
import ColorsPanel from "../index";


describe('Color panel component',()=>{

    //TODO: You can add more test cases here.

    test('Component render correctly', ()=>{
        render(<ColorsPanel/>)
        const resultElement = screen.getByTestId('colorsPanel')
        expect(resultElement).toBeInTheDocument()
    })
})
