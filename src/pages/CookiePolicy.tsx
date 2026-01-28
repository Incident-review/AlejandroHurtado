import { Box, Container, Heading, Text, VStack, Link, ListItem, UnorderedList } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

const CookiePolicy = () => {
  const { t } = useTranslation();

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" mb={6}>
          {t('cookiePolicy.title', 'Cookie Policy')}
        </Heading>
        
        <Text color="gray.400">
          {t('cookiePolicy.lastUpdated', 'Last updated: January 28, 2025')}
        </Text>
        
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            {t('cookiePolicy.whatAreCookies.title', 'What Are Cookies')}
          </Heading>
          <Text mb={4}>
            {t('cookiePolicy.whatAreCookies.content', 'Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the site owners.')}
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            {t('cookiePolicy.howWeUseCookies.title', 'How We Use Cookies')}
          </Heading>
          <Text mb={4}>
            {t('cookiePolicy.howWeUseCookies.content', 'We use cookies for the following purposes:')}
          </Text>
          <UnorderedList spacing={2} mb={4} pl={5}>
            <ListItem>
              {t('cookiePolicy.howWeUseCookies.essential', 'Essential cookies: These are necessary for the website to function and cannot be switched off.')}
            </ListItem>
            <ListItem>
              {t('cookiePolicy.howWeUseCookies.analytics', 'Analytics cookies: These help us understand how visitors interact with our website.')}
            </ListItem>
            <ListItem>
              {t('cookiePolicy.howWeUseCookies.preferences', 'Preference cookies: These remember your preferences and settings.')}
            </ListItem>
          </UnorderedList>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            {t('cookiePolicy.managingCookies.title', 'Managing Cookies')}
          </Heading>
          <Text mb={4}>
            {t('cookiePolicy.managingCookies.content', 'You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, this might affect the functionality of our website.')}
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            {t('cookiePolicy.contactUs.title', 'Contact Us')}
          </Heading>
          <Text>
            {t('cookiePolicy.contactUs.content', 'If you have any questions about this Cookie Policy, please contact us at:')}{' '}
            <Link href="mailto:management@guitarrasonline.com" color="orange.400">
              management@guitarrasonline.com
            </Link>
          </Text>
        </Box>

        <Box mt={8}>
          <Link as={RouterLink} to="/" color="orange.400">
            {t('common.backToHome', '← Back to Home')}
          </Link>
        </Box>
      </VStack>
    </Container>
  );
};

export default CookiePolicy;
