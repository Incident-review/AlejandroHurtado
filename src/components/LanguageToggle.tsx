import { Button, useToast } from '@chakra-ui/react';
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
  
  const toggleLanguage = () => {
    const newLang = currentLanguage === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang).then(() => {
      localStorage.setItem('i18nextLng', newLang);
      toast({
        title: t('languageChanged', { lng: newLang, language: newLang === 'es' ? 'Español' : 'English' }),
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    });
  };

  return (
    <Button
      aria-label={t('common.language')}
      onClick={toggleLanguage}
      size="sm"
      variant="ghost"
      color="white"
      _hover={{
        bg: 'whiteAlpha.300',
        color: '#faf0c0',
        transform: 'scale(1.05)',
      }}
      fontSize="sm"
      fontWeight="semibold"
      px={3}
      py={2}
      border="1px solid"
      borderColor="whiteAlpha.300"
      borderRadius="md"
      transition="all 0.2s"
      minW="60px"
    >
      {currentLanguage === 'es' ? '🇪🇸 ES' : '🇬🇧 EN'}
    </Button>
  );
};

export default LanguageToggle;
