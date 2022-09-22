import { render, screen} from '@testing-library/react';
import TopSection from "../index";


describe('Functional Component',()=>{
    test('Component render correctly', ()=>{
        render(<TopSection/>)
        const inputElements = screen.getByTestId('top-section',{})
        expect(inputElements).toBeInTheDocument()
    })
})
