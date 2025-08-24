import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AllEventsPage from './pages/AllEventsPage';
import HomePage from './pages/HomePage';
import AwardsPage from './pages/AwardsPage';
import CatalogPage from './pages/CatalogPage';
import AwardShowcasePage from './pages/AwardShowcasePage';
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
              <Route path="/awards" element={<AwardsPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/awards/:id" element={<AwardShowcasePage />} />
            </Routes>
          </Box>
        </Router>
      </Box>
    </Box>
  );
}

export default App;
