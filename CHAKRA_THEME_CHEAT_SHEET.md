# Chakra UI Theme Customization Cheat Sheet

This document provides a guide to customizing the theme in your Chakra UI application. You can extend the default theme to match your brand's design requirements.

Your project is using `@chakra-ui/react` version `^3.21.0`.

## 1. Setting up the Custom Theme

To start customizing, you need to extend the default theme. In your application's entry point (e.g., `src/main.tsx` or `src/index.tsx`), you'll wrap your app with `ChakraProvider` and pass your custom theme to it.

First, create a `theme.ts` file (e.g., in `src/theme.ts`):

```typescript
// src/theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  // Your customizations go here
});

export default theme;
```

Then, in your main entry file:

```typescript
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import theme from './theme'; // Import your custom theme

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
```

## 2. Customizing Theme Tokens

### Colors

You can override the default color palette or add new colors.

```typescript
// src/theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f7fafc',  // Lightest shade
      100: '#edf2f7',
      200: '#e2e8f0',
      300: '#cbd5e0',
      400: '#a0aec0',
      500: '#718096',  // Base color
      600: '#4a5568',
      700: '#2d3748',
      800: '#1a202c',
      900: '#171923',  // Darkest shade
    },
    primary: '#3182ce', // Example of a single color
    secondary: '#dd6b20',
  },
});

export default theme;
```

**Usage:**
`<Box bg="brand.500" color="white">This box uses a custom brand color.</Box>`
`<Heading color="primary">This heading uses the primary color.</Heading>`

### Typography

Customize fonts, font sizes, and line heights.

```typescript
// src/theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'Heading Font Name', sans-serif`,
    body: `'Body Font Name', sans-serif`,
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem',
  },
});

export default theme;
```

**Usage:**
`<Heading fontFamily="heading">Custom Heading Font</Heading>`
`<Text fontSize="2xl">This text is extra large.</Text>`

### Spacing

Override the default spacing scale used for `margin`, `padding`, `top`, `left`, etc.

```typescript
// src/theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  space: {
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    // ...and so on
  },
});

export default theme;
```

**Usage:**
`<Box p={2} m={4}>This box has custom padding and margin.</Box>`

## 3. Styling Components

You can change the base styles, variants, and sizes of components.

### Button Component Example

```typescript
// src/theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        fontWeight: 'bold', // Normally, it is 'semibold'
      },
      // 2. We can add a new variant
      variants: {
        'with-shadow': {
          bg: 'red.400',
          boxShadow: '0 0 2px 2px #efdfde',
        },
        // 3. We can override existing variants
        solid: (props) => ({
          bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
        }),
      },
      // 4. We can add a new size
      sizes: {
        xl: {
          h: '56px',
          fontSize: 'lg',
          px: '32px',
        },
      },
      // 5. We can override the default props
      defaultProps: {
        size: 'lg', // default is md
        variant: 'sm', // default is solid
        colorScheme: 'red', // default is gray
      },
    },
  },
});

export default theme;
```

**Usage:**
`<Button>Default Button</Button>`
`<Button variant="with-shadow">Button with Shadow</Button>`
`<Button size="xl">Extra Large Button</Button>`

## 4. Responsive Design (Breakpoints)

Chakra UI comes with a set of default breakpoints. You can customize them.

```typescript
// src/theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  breakpoints: {
    sm: '30em',  // 480px
    md: '48em',  // 768px
    lg: '62em',  // 992px
    xl: '80em',  // 1280px
    '2xl': '96em', // 1536px
  },
});

export default theme;
```

**Usage:**
`<Box width={{ base: '100%', sm: '50%', md: '25%' }}>Responsive Box</Box>`

This cheat sheet should give you a solid foundation for customizing your Chakra UI theme. For more advanced configurations, refer to the official [Chakra UI documentation](https://chakra-ui.com/docs/styled-system/theming/overview).
