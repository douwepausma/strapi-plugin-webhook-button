import type { Core } from '@strapi/strapi';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async executeWebhook(ctx) {
    const res = await strapi.plugin('webhook-button').service('execute').executeWebhook(JSON.parse(ctx.request.body));
    ctx.body = res;
    ctx.status = res.error ? 500 : 200;
  },
});