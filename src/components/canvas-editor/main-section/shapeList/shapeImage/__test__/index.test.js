import { render, screen} from '@testing-library/react';
import ShapeImage from "../index";


describe('Shapes image component',()=>{

    //TODO: You can add more test cases here.

    test('Component render correctly', ()=>{
        render(<ShapeImage/>)
        const resultElement = screen.getByTestId('shapeImage')
        expect(resultElement).toBeInTheDocument()
    })
})
