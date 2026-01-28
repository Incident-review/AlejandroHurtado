import { useEffect, useState } from 'react';
import { Box, Button, Flex, Text, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const COOKIE_CONSENT_KEY = 'cookie_consent_given';

const CookieConsent = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consentGiven = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consentGiven) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="gray.800"
      color="white"
      p={4}
      boxShadow="lg"
      zIndex="banner"
    >
      <Flex
        maxW="container.lg"
        mx="auto"
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="space-between"
        gap={4}
      >
        <Text fontSize="sm" flex="1">
          {t('cookieConsent.message', 'We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies.')}{' '}
          <ChakraLink as={RouterLink} to="/cookie-policy" color="orange.300" textDecoration="underline">
            {t('cookieConsent.learnMore', 'Learn more')}
          </ChakraLink>
        </Text>
        <Flex gap={3}>
          <Button
            size="sm"
            colorScheme="orange"
            onClick={acceptCookies}
          >
            {t('cookieConsent.accept', 'Accept')}
          </Button>
          <Button
            size="sm"
            variant="outline"
            colorScheme="whiteAlpha"
            onClick={() => setVisible(false)}
          >
            {t('common.close', 'Close')}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CookieConsent;
