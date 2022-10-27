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

});