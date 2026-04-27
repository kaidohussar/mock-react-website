# Migration to react-intl with Contentstorage Plugin

## Summary

Successfully migrated the project from `@contentstorage/react` to `react-intl` with the `@contentstorage/react-intl-plugin`. This enables live editor translation tracking while using the standard react-intl API.

## Changes Made

### 1. Dependencies

**Installed:**
- `react-intl` - Standard internationalization library for React
- `@contentstorage/react-intl-plugin` - Contentstorage plugin for react-intl with live editor support

**Removed:**
- `@contentstorage/react` - Replaced with react-intl

### 2. Message Files Created

Created translation message files in `/src/messages/`:
- `en.json` - English translations
- `et.json` - Estonian translations

All content IDs have been mapped to their respective translation strings:
- Dashboard greetings and KPI labels
- Login form labels and placeholders
- Sidebar navigation items
- And more...

### 3. Component Updates

#### App.tsx
- Replaced `ContentProvider` with `ContentstorageIntlProvider`
- Added `LocaleContext` for language switching functionality
- Set up messages object with both EN and ET translations
- Locale state management implemented

#### DashboardPage.tsx
- Replaced `useGetText` with `useIntl` hook
- Changed `Text` component to `FormattedMessage`
- Removed `Variation` and `Image` components (not applicable for react-intl)
- Updated all content IDs to use `intl.formatMessage()` or `<FormattedMessage>`

#### LoginPage.tsx
- Replaced `useGetText` with `useIntl` hook
- Changed `Text` component to `FormattedMessage`
- Updated form labels to use `intl.formatMessage()`

#### Sidebar.tsx
- Replaced `Text` component with `FormattedMessage`
- All navigation items now use react-intl

#### Header.tsx
- Added language switcher dropdown (EN/ET)
- Uses `LocaleContext` to toggle between languages

### 4. How It Works

The Contentstorage plugin automatically:
1. Detects when running in the Contentstorage live editor
2. Tracks translation values to their message IDs via `window.memoryMap`
3. Enables click-to-edit functionality in the live editor
4. Has zero overhead in production (tracking only activates in live editor mode)

### 5. Language Switching

Users can now switch between languages using the dropdown in the Header:
- EN (English)
- ET (Estonian)

The selected language persists throughout the session.

## Usage

### Running the Application

```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

### Testing in Contentstorage Live Editor

To enable live editor mode, the app must:
1. Run in an iframe (`window.self !== window.top`)
2. Have the query parameter `?contentstorage_live_editor=true` in the URL

When both conditions are met, the plugin will automatically track translations in `window.memoryMap`.

### Adding New Translations

1. Add the translation key and value to both `/src/messages/en.json` and `/src/messages/et.json`
2. Use in components:

```tsx
// Using useIntl hook
import { useIntl } from 'react-intl';

const MyComponent = () => {
  const intl = useIntl();
  const text = intl.formatMessage({ id: 'my.message.id' });

  // With variables
  const textWithVars = intl.formatMessage(
    { id: 'greeting' },
    { name: 'John' }
  );

  return <div>{text}</div>;
};
```

```tsx
// Using FormattedMessage component
import { FormattedMessage } from 'react-intl';

const MyComponent = () => {
  return (
    <div>
      <FormattedMessage id="my.message.id" />

      {/* With variables */}
      <FormattedMessage id="greeting" values={{ name: 'John' }} />
    </div>
  );
};
```

## Benefits

1. **Standard API**: Uses react-intl, the industry-standard i18n library
2. **Live Editor Integration**: Automatic tracking for Contentstorage live editor
3. **Zero Production Overhead**: Tracking only activates in live editor mode
4. **Type Safety**: Full TypeScript support
5. **Easy Migration**: Drop-in replacement for IntlProvider
6. **Better Ecosystem**: Access to full react-intl ecosystem and tooling

## Next Steps

- Test the application in the Contentstorage live editor
- Verify all translations display correctly
- Test language switching functionality
- Add more translations as needed for other pages (Analytics, Reports, Integrations, Settings currently have static content)
