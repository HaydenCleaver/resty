import '@testing-library/jest-dom';
import { render, screen, fireEvent} from '@testing-library/react';

import Form from './form';

describe('Form Component', () => {

  test('calls handleApi', () => {

    let handleApiCall = jest.fn();

    render(<Form handleApiCall={handleApiCall} />);
    let button = screen.getByText('GO!');
    fireEvent.click(button)
    expect(handleApiCall).toHaveBeenCalled();

  });

  test('checks REST method', () => {

    let handleRestMethod = jest.fn();

    render(<Form />)
    let button = screen.getByText('GET');
    fireEvent.click(button);
    expect(handleRestMethod).toHaveBeenCalled();

  });
});