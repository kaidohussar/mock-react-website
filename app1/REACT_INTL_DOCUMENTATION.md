# Contentstorage React-Intl Plugin Documentation

Official react-intl plugin for [Contentstorage](https://contentstorage.app) live editor translation tracking.

## Features

- **Live Editor Integration** - Automatically detects and enables tracking when running in Contentstorage live editor
- **Translation Tracking** - Maps translation values to their message IDs for click-to-edit functionality
- **Zero Production Overhead** - Tracking only activates in live editor mode
- **TypeScript Support** - Full type definitions included
- **Memory Management** - Automatic cleanup of old entries to prevent memory leaks
- **Drop-in Replacement** - Simply replace `IntlProvider` with `ContentstorageIntlProvider`

## Installation

```bash
npm install react-intl @contentstorage/react-intl-plugin
```

## Quick Start

### Basic Usage

Replace react-intl's `IntlProvider` with `ContentstorageIntlProvider`:

```tsx
import { ContentstorageIntlProvider } from '@contentstorage/react-intl-plugin';

function App() {
  const messages = {
    welcome: 'Welcome to our site',
    greeting: 'Hello {name}!',
  };

  return (
    <ContentstorageIntlProvider locale="en" messages={messages}>
      <YourApp />
    </ContentstorageIntlProvider>
  );
}
```

**That's it!** Live editor tracking is now enabled when in live editor mode.

## How It Works

### Live Editor Detection

The plugin automatically detects when your app is running in the Contentstorage live editor by checking:

1. The app is running in an iframe (`window.self !== window.top`)
2. The URL contains the query parameter `?contentstorage_live_editor=true`

Both conditions must be true for tracking to activate.

### Translation Tracking

When in live editor mode, the plugin maintains a global `window.memoryMap` that maps translation values to their message IDs:

```typescript
window.memoryMap = new Map([
  ["Welcome to our site", {
    ids: Set(["welcome", "homepage.title"]),
    type: "text",
    metadata: {
      language: "en",
      trackedAt: 1704067200000
    }
  }],
  // ... more entries
]);
```

This allows the Contentstorage live editor to:
1. Find which message IDs produced a given text
2. Enable click-to-edit functionality
3. Highlight translatable content on the page

### Memory Management

The plugin automatically limits the size of `window.memoryMap` to prevent memory leaks:

- Default limit: 10,000 entries
- Oldest entries are removed first (based on `trackedAt` timestamp)
- Configurable via `maxMemoryMapSize` option

## Configuration Options

```tsx
<ContentstorageIntlProvider
  locale="en"
  messages={messages}

  // Optional: Enable debug logging
  debug={false}

  // Optional: Maximum number of entries in memoryMap
  maxMemoryMapSize={10000}

  // Optional: Force live mode (useful for testing)
  forceLiveMode={false}

  // ... all other IntlProvider props
>
  <YourApp />
</ContentstorageIntlProvider>
```

## Usage with React

### With Hooks

```tsx
import { useIntl } from 'react-intl';
import { ContentstorageIntlProvider } from '@contentstorage/react-intl-plugin';

function MyComponent() {
  const intl = useIntl();

  return (
    <div>
      <h1>{intl.formatMessage({ id: 'welcome' })}</h1>
      <p>{intl.formatMessage({ id: 'greeting' }, { name: 'User' })}</p>
    </div>
  );
}

function App() {
  return (
    <ContentstorageIntlProvider locale="en" messages={messages}>
      <MyComponent />
    </ContentstorageIntlProvider>
  );
}
```

### With Components

```tsx
import { FormattedMessage } from 'react-intl';
import { ContentstorageIntlProvider } from '@contentstorage/react-intl-plugin';

function MyComponent() {
  return (
    <div>
      <h1><FormattedMessage id="welcome" /></h1>
      <p><FormattedMessage id="greeting" values={{ name: 'User' }} /></p>
    </div>
  );
}

function App() {
  return (
    <ContentstorageIntlProvider locale="en" messages={messages}>
      <MyComponent />
    </ContentstorageIntlProvider>
  );
}
```

## Usage with Next.js

### App Router (Next.js 13+)

```tsx
// app/providers.tsx
'use client';

import { ContentstorageIntlProvider } from '@contentstorage/react-intl-plugin';
import messages from './messages/en.json';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ContentstorageIntlProvider locale="en" messages={messages}>
      {children}
    </ContentstorageIntlProvider>
  );
}
```

```tsx
// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### Pages Router (Next.js 12 and below)

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import { ContentstorageIntlProvider } from '@contentstorage/react-intl-plugin';
import messages from '../messages/en.json';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContentstorageIntlProvider locale="en" messages={messages}>
      <Component {...pageProps} />
    </ContentstorageIntlProvider>
  );
}
```

## Real-World Example

Here's a complete example with language switching:

```tsx
import React, { useState, createContext } from 'react';
import { ContentstorageIntlProvider } from '@contentstorage/react-intl-plugin';
import { useIntl, FormattedMessage } from 'react-intl';
import enMessages from './messages/en.json';
import esMessages from './messages/es.json';

// Create a context for locale switching
export const LocaleContext = createContext({
  locale: 'en',
  setLocale: () => {},
});

function LanguageSwitcher() {
  const { locale, setLocale } = React.useContext(LocaleContext);

  return (
    <select value={locale} onChange={(e) => setLocale(e.target.value)}>
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  );
}

function Dashboard() {
  const intl = useIntl();

  const welcomeMessage = intl.formatMessage(
    { id: 'dashboard.welcome' },
    { name: 'John' }
  );

  return (
    <div>
      <h1>{welcomeMessage}</h1>
      <p><FormattedMessage id="dashboard.description" /></p>
    </div>
  );
}

function App() {
  const [locale, setLocale] = useState('en');

  const messages = {
    en: enMessages,
    es: esMessages,
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <ContentstorageIntlProvider
        locale={locale}
        messages={messages[locale]}
        debug={false}
      >
        <LanguageSwitcher />
        <Dashboard />
      </ContentstorageIntlProvider>
    </LocaleContext.Provider>
  );
}

export default App;
```

**Message files:**

```json
// messages/en.json
{
  "dashboard.welcome": "Welcome back, {name}!",
  "dashboard.description": "Here's your analytics overview"
}
```

```json
// messages/es.json
{
  "dashboard.welcome": "¡Bienvenido de nuevo, {name}!",
  "dashboard.description": "Aquí está tu resumen de análisis"
}
```

## Message File Organization

### Recommended Structure

```
src/
  messages/
    en.json          # English translations
    es.json          # Spanish translations
    fr.json          # French translations
    ...
```

### Flat Structure (Recommended)

```json
{
  "app.title": "My Application",
  "app.description": "Welcome to my app",
  "login.email": "Email Address",
  "login.password": "Password",
  "login.submit": "Sign In",
  "dashboard.greeting": "Hello, {name}!",
  "dashboard.visitors": "Total Visitors",
  "sidebar.home": "Home",
  "sidebar.settings": "Settings"
}
```

### Nested Structure (Alternative)

You can use nested objects, but you'll need to flatten them before passing to the provider:

```json
{
  "app": {
    "title": "My Application",
    "description": "Welcome to my app"
  },
  "login": {
    "email": "Email Address",
    "password": "Password",
    "submit": "Sign In"
  }
}
```

Flatten utility:

```typescript
function flattenMessages(nestedMessages: any, prefix = ''): Record<string, string> {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {} as Record<string, string>);
}

// Usage
const flatMessages = flattenMessages(nestedMessages);
```

## Testing

### Force Live Mode

For testing purposes, you can force live mode:

```tsx
<ContentstorageIntlProvider
  locale="en"
  messages={messages}
  forceLiveMode={true} // Always enable tracking
>
  <YourApp />
</ContentstorageIntlProvider>
```

### Debug Memory Map

You can inspect the memory map in your browser console:

```typescript
import { debugMemoryMap } from '@contentstorage/react-intl-plugin';

// In browser console or your code
debugMemoryMap();

// Output:
// [Contentstorage] Memory map contents:
// Total entries: 156
// ┌─────────┬──────────────────────────────┬─────────────────────┐
// │ (index) │ value                        │ keys                │
// ├─────────┼──────────────────────────────┼─────────────────────┤
// │    0    │ 'Welcome to our site'        │ 'welcome'           │
// └─────────┴──────────────────────────────┴─────────────────────┘
```

### Testing in Development

To test the live editor integration locally:

1. Run your app in development mode
2. Open it in an iframe with the query parameter:
   ```html
   <iframe src="http://localhost:3000?contentstorage_live_editor=true"></iframe>
   ```
3. Check `window.memoryMap` in the console to see tracked translations

## Common Patterns

### Using Variables in Messages

```tsx
// In component
const intl = useIntl();
const message = intl.formatMessage(
  { id: 'user.greeting' },
  { name: 'Alice', count: 5 }
);

// In message file
{
  "user.greeting": "Hello {name}, you have {count} new messages"
}
```

### Pluralization

```tsx
const intl = useIntl();
const message = intl.formatMessage(
  { id: 'items.count' },
  { count: 5 }
);

// In message file
{
  "items.count": "{count, plural, =0 {No items} one {# item} other {# items}}"
}
```

### Date and Time Formatting

```tsx
import { FormattedDate, FormattedTime } from 'react-intl';

function MyComponent() {
  const now = new Date();

  return (
    <div>
      <FormattedDate value={now} year="numeric" month="long" day="numeric" />
      <FormattedTime value={now} />
    </div>
  );
}
```

### Number Formatting

```tsx
import { FormattedNumber } from 'react-intl';

function Price() {
  return (
    <FormattedNumber
      value={1234.56}
      style="currency"
      currency="USD"
    />
  );
}
```

## TypeScript

### Full TypeScript Support

```typescript
import type {
  ContentstorageIntlProviderProps,
  MemoryMap,
  MemoryMapEntry,
  ContentstorageWindow,
} from '@contentstorage/react-intl-plugin';

// Type your messages
interface Messages {
  'app.title': string;
  'app.description': string;
  'login.email': string;
  // ...
}

// Strongly typed message usage
declare module 'react-intl' {
  interface IntlConfig {
    messages: Record<keyof Messages, string>;
  }
}
```

### Custom Message Type Helper

```typescript
// types/messages.ts
export type MessageKeys = keyof typeof import('../messages/en.json');

// Usage in components
import { useIntl } from 'react-intl';
import type { MessageKeys } from './types/messages';

function MyComponent() {
  const intl = useIntl();

  // Type-safe message IDs
  const text = intl.formatMessage({ id: 'app.title' as MessageKeys });

  return <div>{text}</div>;
}
```

## Performance

- **Zero overhead in production** - Tracking only happens in live editor
- **Minimal overhead in editor** - Simple Map operations, ~1ms per translation
- **Automatic cleanup** - Old entries removed to prevent memory leaks
- **One-time tracking** - Static messages tracked once on load

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2019+ features required
- React 16.8+ (hooks support)

## Troubleshooting

### memoryMap is empty

**Problem**: `window.memoryMap` exists but has no entries.

**Solutions**:
- Verify you're in an iframe: `window.self !== window.top`
- Check URL has `?contentstorage_live_editor=true`
- Enable debug mode to see what's being tracked:
  ```tsx
  <ContentstorageIntlProvider debug={true} locale="en" messages={messages}>
  ```
- Ensure messages are being passed to provider
- Check browser console for any errors

### Live editor can't find translations

**Problem**: Clicking on translated text doesn't work in live editor.

**Solutions**:
- Verify translation values exactly match rendered text
- Check that message IDs are being tracked (enable debug mode)
- Ensure messages are passed to `ContentstorageIntlProvider`
- Look for console errors in the live editor

### TypeScript errors

**Problem**: TypeScript can't find type definitions.

**Solutions**:
- Ensure `@types/react` is installed: `npm install -D @types/react`
- Check `tsconfig.json` has `"esModuleInterop": true`
- Try importing types explicitly:
  ```typescript
  import type { ContentstorageIntlProviderProps } from '@contentstorage/react-intl-plugin';
  ```

### Messages not updating when locale changes

**Problem**: UI doesn't update when switching languages.

**Solutions**:
- Ensure you're updating the `locale` and `messages` props on `ContentstorageIntlProvider`
- Check that your locale state management is working correctly
- Verify the new messages are being loaded properly

### Build errors with JSON imports

**Problem**: `Cannot find module './messages/en.json'`

**Solutions**:

For TypeScript, add to your `tsconfig.json`:
```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
}
```

For Vite, this works by default. For Webpack, add to `webpack.config.js`:
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.json$/,
        type: 'json'
      }
    ]
  }
};
```

## Migration Guide

### Migrating from @contentstorage/react

If you're migrating from the legacy `@contentstorage/react` package:

**Before:**
```tsx
import { ContentProvider, Text, useGetText } from '@contentstorage/react';

function App() {
  return (
    <ContentProvider
      contentKey="your-key"
      languageCodes={['EN', 'ES']}
      contentMode="headless"
    >
      <MyApp />
    </ContentProvider>
  );
}

function MyComponent() {
  const text = useGetText({ contentId: 'welcome.message' });
  return <div><Text contentId="greeting" variables={{ name: 'User' }} /></div>;
}
```

**After:**
```tsx
import { ContentstorageIntlProvider } from '@contentstorage/react-intl-plugin';
import { useIntl, FormattedMessage } from 'react-intl';
import enMessages from './messages/en.json';
import esMessages from './messages/es.json';

function App() {
  const [locale, setLocale] = useState('en');
  const messages = { en: enMessages, es: esMessages };

  return (
    <ContentstorageIntlProvider locale={locale} messages={messages[locale]}>
      <MyApp />
    </ContentstorageIntlProvider>
  );
}

function MyComponent() {
  const intl = useIntl();
  const text = intl.formatMessage({ id: 'welcome.message' });
  return <div><FormattedMessage id="greeting" values={{ name: 'User' }} /></div>;
}
```

**Migration Steps:**
1. Create message JSON files for each language
2. Extract all content IDs and their translations
3. Replace `ContentProvider` with `ContentstorageIntlProvider`
4. Replace `useGetText` with `useIntl().formatMessage`
5. Replace `<Text>` with `<FormattedMessage>`
6. Remove `@contentstorage/react` dependency
7. Install `react-intl` and `@contentstorage/react-intl-plugin`

## Best Practices

1. **Use flat message structure** - Easier to manage and reference
2. **Keep message IDs descriptive** - Use namespacing like `page.section.element`
3. **Extract messages to separate files** - One file per locale
4. **Type your message IDs** - Use TypeScript for type safety
5. **Use FormattedMessage for simple cases** - Use useIntl hook for complex logic
6. **Test in live editor mode** - Verify tracking works before deployment
7. **Keep messages simple** - Avoid complex nested structures
8. **Use ICU message format** - For pluralization and complex formatting

## API Reference

### ContentstorageIntlProvider

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `locale` | `string` | Yes | - | Current locale (e.g., 'en', 'es') |
| `messages` | `Record<string, string>` | Yes | - | Flat object of message IDs to translations |
| `debug` | `boolean` | No | `false` | Enable debug logging |
| `maxMemoryMapSize` | `number` | No | `10000` | Max entries in memory map |
| `forceLiveMode` | `boolean` | No | `false` | Force live mode (for testing) |
| ...rest | `IntlProviderProps` | No | - | All other react-intl IntlProvider props |

### Exported Functions

- `debugMemoryMap()` - Log memory map contents to console

### Exported Types

```typescript
interface ContentstorageIntlProviderProps extends IntlProviderProps {
  debug?: boolean;
  maxMemoryMapSize?: number;
  forceLiveMode?: boolean;
}

interface MemoryMapEntry {
  ids: Set<string>;
  type: 'text' | 'html' | 'image';
  metadata: {
    language: string;
    trackedAt: number;
  };
}

type MemoryMap = Map<string, MemoryMapEntry>;

interface ContentstorageWindow extends Window {
  memoryMap?: MemoryMap;
}
```

## Support

- **Documentation**: https://docs.contentstorage.app
- **Issues**: https://github.com/contentstorage/react-intl-plugin/issues
- **Email**: support@contentstorage.app

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for details.
