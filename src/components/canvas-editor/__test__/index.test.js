import { render, screen} from '@testing-library/react';
import CanvasEditor from "../index";


describe('Main Editor component',()=>{

    //TODO: You can add more test cases here.

    test('Component render correctly', ()=>{
        render(<CanvasEditor/>)
        const resultElement = screen.getByTestId('mainEditor')
        expect(resultElement).toBeInTheDocument()
    })
})
