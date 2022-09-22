import { render, screen} from '@testing-library/react';
import CanvasSizeInput from "../index";


describe('Canvas Size Input Wrapper',()=>{

    //TODO: You can add more test cases here.

    test('Component render correctly', async ()=>{
        render(<CanvasSizeInput/>)
        const sizeInput = await screen.getByTestId('canvas-size-input')
        expect(sizeInput).toBeInTheDocument()
    })
})
