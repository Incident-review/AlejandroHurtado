import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import theme from '../theme';
import Hero from './Hero';

describe('Hero component', () => {
  it('should render the heading, quote, and image', () => {
    // Arrange
    render(
      <ChakraProvider theme={theme}>
        <Hero />
      </ChakraProvider>
    );

    // Act
    const heading = screen.getByRole('heading', {
      name: /"Music is the shorthand of emotion."/i,
    });
    const author = screen.getByText(/- Leo Tolstoy/i);
    const image = screen.getByRole('img', { name: /Artist performing/i });

    // Assert
    expect(heading).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
