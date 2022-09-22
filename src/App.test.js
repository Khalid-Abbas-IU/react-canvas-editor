import { render, screen } from '@testing-library/react';
import App from './App';

describe('Functional Component',()=>{

  //TODO: You can add more test cases here.

  test('Main Component render correctly', ()=>{
    render(<App/>)
    const inputElements = screen.getByTestId('mainApp',{})
    expect(inputElements).toBeInTheDocument()
  })
})
