import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import Statistics from '../components/Statistics';

describe('Statistics component', () => {
  it('should render all statistic labels', () => {
    render(
      <MemoryRouter>
        <ChakraProvider theme={theme}>
          <Statistics />
        </ChakraProvider>
      </MemoryRouter>
    );

    // Check if all statistic labels are displayed
    const concertsLabel = screen.getByText(/concerts played/i);
    const awardsLabel = screen.getByText(/awards won/i);
    const countriesLabel = screen.getByText(/countries toured/i);

    expect(concertsLabel).toBeInTheDocument();
    expect(awardsLabel).toBeInTheDocument();
    expect(countriesLabel).toBeInTheDocument();
  });
});
