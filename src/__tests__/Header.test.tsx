import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import Header from '../components/Header';

describe('Header component', () => {
  it('should render the artist name and navigation links', () => {
    render(
      <MemoryRouter>
        <ChakraProvider theme={theme}>
          <Header />
        </ChakraProvider>
      </MemoryRouter>
    );

    // Check if the artist name is displayed
    const heading = screen.getByRole('heading', { name: /alejandro hurtado/i });
    expect(heading).toBeInTheDocument();

    // Check if navigation links are present
    const homeLink = screen.getByRole('link', { name: /home/i });
    const eventsLink = screen.getByRole('link', { name: /events/i });
    const awardsLink = screen.getByRole('link', { name: /awards/i });
    const catalogLink = screen.getByRole('link', { name: /contact & booking/i });

    expect(homeLink).toBeInTheDocument();
    expect(eventsLink).toBeInTheDocument();
    expect(awardsLink).toBeInTheDocument();
    expect(catalogLink).toBeInTheDocument();
  });
});
