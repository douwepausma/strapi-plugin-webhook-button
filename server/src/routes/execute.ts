export default [
  {
    method: 'POST',
    path: '/execute',
    handler: 'execute.executeWebhook',
    config: {
      auth: false, // or true if it needs auth
    },
  },
  {
    method: 'POST',
    path: '/resolve',
    handler: 'execute.executeNavigation',
    config: {
      auth: false,
    },
  }
];
