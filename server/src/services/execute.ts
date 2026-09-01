import { configSchema } from "src/schema";

type Config = ReturnType<typeof configSchema.parse>;

export default ({ strapi }) => ({
    async executeWebhook(data) {
        const config = strapi.config.get('plugin::webhook-button', {}) as Config;
        const buttonConfig = config.buttons.find(button => button.id === data.buttonConfig.id);

        try {
            const body = buttonConfig.body ? JSON.stringify(buttonConfig.body(data.entry)) : undefined;

            const res = await fetch(buttonConfig.url, {
                method: buttonConfig.method,
                headers: buttonConfig.headers,
                body
            });

            if (!res.ok) {
                throw new Error(`Request failed with status ${res.status}`);
            }

            return await res.json();
        } catch (error) {
            console.error('Error executing webhook:', error);
            return { error: 'Failed to execute webhook', details: error.message };
        }
    }
});