import { render, screen} from '@testing-library/react';
import ShapeList from "../index";


describe('Shapes list component',()=>{

    //TODO: You can add more test cases here.

    test('Component render correctly', ()=>{
        render(<ShapeList/>)
        const resultElement = screen.getByTestId('shapeList')
        expect(resultElement).toBeInTheDocument()
    })
})
