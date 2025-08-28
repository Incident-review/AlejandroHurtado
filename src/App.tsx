import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AllEventsPage from './pages/AllEventsPage';
import HomePage from './pages/HomePage';
import DiscographyPage from './pages/DiscographyPage';
import AlbumDetailPage from './pages/AlbumDetailPage';
import CatalogPage from './pages/CatalogPage';
import SpectacleDetailPage from './pages/SpectacleDetailPage';

import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <Box minH="100vh" bg="black" position="relative" overflowX="hidden">
      <AnimatedBackground />
      <Box position="relative" zIndex={1} minH="100vh">
        <Router>
          <Header />
          <Box as="main" position="relative" pt={`${64 + 48}px`}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<AllEventsPage />} />
              <Route path="/discography" element={<DiscographyPage />} />
              <Route path="/discography/:slug" element={<AlbumDetailPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/catalog/:slug" element={<SpectacleDetailPage />} />
            </Routes>
          </Box>
        </Router>
      </Box>
    </Box>
  );
}

export default App;
