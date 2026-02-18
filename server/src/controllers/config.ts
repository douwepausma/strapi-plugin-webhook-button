import type { Core } from '@strapi/strapi';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  getConfig(ctx) {
    ctx.body = strapi.config.get('plugin::webhook-button', {});
  },
});