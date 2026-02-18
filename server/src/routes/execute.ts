export default [
  {
    method: 'POST',
    path: '/execute',
    handler: 'execute.executeWebhook',
    config: {
      auth: false, // or true if it needs auth
    },
  },
];
