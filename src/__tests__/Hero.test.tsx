import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import Hero from '../components/Hero';

describe('Hero component', () => {
  it('should render the heading, quote, and image', () => {
    render(
      <MemoryRouter>
        <ChakraProvider theme={theme}>
          <Hero />
        </ChakraProvider>
      </MemoryRouter>
    );

    // Check if the quote heading is displayed
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();

    // Check if the quote author is displayed
    const author = screen.getByText(/- .+/);
    expect(author).toBeInTheDocument();

    // Check if the image is displayed
    const image = screen.getByAltText(/artist performing/i);
    expect(image).toBeInTheDocument();
  });
});
