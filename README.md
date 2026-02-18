# Strapi Plugin Webhook Button

Add custom buttons to the content-type entry edit view that trigger webhooks.

## Features

- Display custom buttons in the side panel of content-type entry edit views
- Configure multiple buttons with different webhook endpoints
- Filter buttons by content-type model
- Access entry data in webhook request body
- Customizable button appearance (icons, variants)

## Installation

```bash
npm install strapi-plugin-webhook-button
```

## Configuration

Configure the plugin in your Strapi project's `config/plugins.ts` (or `config/plugins.js`):

```typescript
export default ({ env }) => ({
  'webhook-button': {
    enabled: true,
    config: {
      cardTitle: 'Actions', // Optional: title of the side panel card
      buttons: [
        {
          id: 'publish-to-cdn',
          name: 'Publish to CDN',
          icon: 'Cloud', // Optional: icon from @strapi/icons
          variant: 'success', // Optional: button variant
          url: 'https://api.example.com/webhook/publish',
          method: 'POST',
          headers: { // Optional
            'Authorization': 'Bearer your-token',
            'Content-Type': 'application/json',
          },
          body: (entry) => ({ // Optional: function that receives entry data
            contentType: entry.contentType.uid,
            documentId: entry.values.documentId,
          }),
          models: ['api::article.article'], // Optional: limit to specific content-types
        },
      ],
    },
  },
});
```

## Button Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier for the button |
| `name` | `string` | Yes | Display text for the button |
| `url` | `string` | Yes | Webhook URL to call |
| `method` | `'GET' \| 'POST' \| 'PUT' \| 'DELETE'` | Yes | HTTP method |
| `icon` | `string` | No | Icon name from `@strapi/icons` |
| `variant` | `string` | No | Button style: `'default'`, `'secondary'`, `'tertiary'`, `'success'`, `'success-light'`, `'danger'`, `'danger-light'`, `'ghost'` |
| `headers` | `Record<string, string>` | No | HTTP headers to include |
| `body` | `(entry) => object` | No | Function returning the request body, receives entry data |
| `models` | `string[]` | No | Content-type UIDs to show this button on (shows on all if not specified) |

## Body Function

The `body` option accepts a function that receives the entry data and returns an object to send as the request body:

```typescript
body: (entry) => ({
  contentType: entry.contentType.uid,      // e.g., 'api::article.article'
  documentId: entry.values.documentId,     // The entry's document ID
  title: entry.values.title,               // Access any field value
  // ... any other entry fields
})
```

## Requirements

- Strapi v5.36.0 or higher

## Contributing

Contributions are welcome! Whether it's bug fixes, new features, or documentation improvements, feel free to open an issue or submit a pull request.

### Ideas for Future Features

- **Admin UI for button management** - Configure buttons directly in the Strapi admin panel instead of the plugin config file
- Additional webhook authentication methods
- Webhook response handling and custom success/error messages

If you're interested in working on any of these, we'd love to see your contribution!

## License

MIT
