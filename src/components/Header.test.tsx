import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import theme from '../theme';
import Header from './Header';

describe('Header component', () => {
  it('should render the artist name and navigation links', () => {
    // Arrange: Render the component within providers to supply context
    render(
      <MemoryRouter>
        <ChakraProvider theme={theme}>
          <Header />
        </ChakraProvider>
      </MemoryRouter>
    );

    // Act: Query for the elements on the screen
    const heading = screen.getByRole('heading', { name: /the artist/i });
    const homeLink = screen.getByRole('button', { name: /home/i });
    const eventsLink = screen.getByRole('button', { name: /events/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });

    // Assert: Check that all expected elements are in the document
    expect(heading).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(eventsLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });
});
