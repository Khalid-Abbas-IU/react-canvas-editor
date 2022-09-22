import { render, screen} from '@testing-library/react';
import InputSize from "../index";
import userEvent from "@testing-library/user-event";


describe('Canvas Size Input Component',()=>{

    //TODO: You can add more test cases here.

    test('Component render correctly', async ()=>{
        render(<InputSize/>)
        const inputElement = await screen.findByRole('input')
        expect(inputElement).toBeInTheDocument()
    })

    test('Input should accept only numbers as input', async ()=>{
        render(<InputSize/>)
        const inputElement = await screen.getByRole('input')
        userEvent.type(inputElement,'abc')
        expect(inputElement.value).toMatch(inputElement.value)
    })

})
