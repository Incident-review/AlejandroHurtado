import { Button, useToast, HStack, Box, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const LanguageToggle = () => {
  const { i18n, t } = useTranslation();
  const toast = useToast();
  const currentLanguage = i18n.language || 'es';
  
  // Set initial language from localStorage if available
  useEffect(() => {
    const savedLang = localStorage.getItem('i18nextLng') || 'es';
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);
  
  // Removed toggleLanguage function as we now have individual handlers for each button

  const isSpanish = currentLanguage === 'es';

  return (
    <HStack 
      spacing={0}
      border="1px solid"
      borderColor="whiteAlpha.400"
      borderRadius="md"
      bg="blackAlpha.500"
      overflow="hidden"
      height="28px"
    >
      <Button
        aria-label="Switch to Spanish"
        onClick={() => i18n.changeLanguage('es').then(() => {
          localStorage.setItem('i18nextLng', 'es');
          toast({
            title: t('languageChanged', { lng: 'es', language: 'Español' }),
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top',
          });
        })}
        size="xs"
        variant="ghost"
        color={isSpanish ? 'white' : 'whiteAlpha.700'}
        bg={isSpanish ? 'whiteAlpha.300' : 'transparent'}
        _hover={{
          bg: isSpanish ? 'whiteAlpha.400' : 'whiteAlpha.200',
        }}
        p={0}
        minW="30px"
        h="100%"
        borderRadius="none"
        transition="all 0.2s"
      >
        <Text as="span" fontSize="md">🇪🇸</Text>
      </Button>
      
      <Box h="60%" w="1px" bg="whiteAlpha.400" />
      
      <Button
        aria-label="Switch to English"
        onClick={() => i18n.changeLanguage('en').then(() => {
          localStorage.setItem('i18nextLng', 'en');
          toast({
            title: t('languageChanged', { lng: 'en', language: 'English' }),
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top',
          });
        })}
        size="xs"
        variant="ghost"
        color={!isSpanish ? 'white' : 'whiteAlpha.700'}
        bg={!isSpanish ? 'whiteAlpha.300' : 'transparent'}
        _hover={{
          bg: !isSpanish ? 'whiteAlpha.400' : 'whiteAlpha.200',
        }}
        p={0}
        minW="30px"
        h="100%"
        borderRadius="none"
        transition="all 0.2s"
      >
        <Text as="span" fontSize="md">🇬🇧</Text>
      </Button>
    </HStack>
  );
};

export default LanguageToggle;
