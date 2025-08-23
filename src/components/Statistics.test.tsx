import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import theme from '../theme';
import Statistics from './Statistics';

describe('Statistics component', () => {
  it('should render all statistic labels', () => {
    // Arrange
    render(
      <ChakraProvider theme={theme}>
        <Statistics />
      </ChakraProvider>
    );

    // Act
    const concertsLabel = screen.getByText(/Concerts Played/i);
    const awardsLabel = screen.getByText(/Awards Won/i);
    const countriesLabel = screen.getByText(/Countries Toured/i);

    // Assert
    expect(concertsLabel).toBeInTheDocument();
    expect(awardsLabel).toBeInTheDocument();
    expect(countriesLabel).toBeInTheDocument();
  });
});
