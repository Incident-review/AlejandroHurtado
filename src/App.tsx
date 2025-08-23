import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AllEventsPage from './pages/AllEventsPage';
import HomePage from './pages/HomePage';
import AwardsPage from './pages/AwardsPage';
import CatalogPage from './pages/CatalogPage';
import AwardShowcasePage from './pages/AwardShowcasePage';

function App() {
  return (
    <Router>
      <Box>
        <Header />
        <Box pt="var(--header-height)">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<AllEventsPage />} />
            <Route path="/awards" element={<AwardsPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/awards/:awardName" element={<AwardShowcasePage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
