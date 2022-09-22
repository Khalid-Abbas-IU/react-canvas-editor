import { render, screen} from '@testing-library/react';
import CanvasSizeInput from "../index";


describe('Shapes list component',()=>{

    //TODO: You can add more test cases here.

    test('Component render correctly', ()=>{
        render(<CanvasSizeInput/>)
        const resultElement = screen.getByTestId('shapeList')
        expect(resultElement).toBeInTheDocument()
    })
})
