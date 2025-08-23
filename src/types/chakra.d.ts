import { Theme } from '@chakra-ui/react';

declare module '@chakra-ui/react' {
  interface ChakraProviderProps {
    theme?: Theme | Record<string, any>;
    value?: never; // This tells TypeScript that value is not required
  }
}

export {};
