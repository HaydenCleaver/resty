import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Results from './results';

describe('Results Component', () => {

  test('displays data from API call', () => {

    let data = {name: "Test", number: 2}

    render(<Results data={data} />);

    let results = screen.getByTestId('data');

    expect(results).toHaveTextContent("Test");
    expect(results).toHaveTextContent(2);
    
  });
});