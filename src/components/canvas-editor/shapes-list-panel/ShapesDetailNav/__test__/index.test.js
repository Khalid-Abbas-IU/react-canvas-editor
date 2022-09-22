import { render, screen} from '@testing-library/react';
import CanvasSizeInput from "../index";


describe('Shape detail component',()=>{

    //TODO: You can add more test cases here.

    test('Component render correctly', async ()=>{
        render(<CanvasSizeInput/>)
        const resultElement = await screen.getByTestId('shape-detail')
        expect(resultElement).toBeInTheDocument()
    })
})
