import { configSchema } from '../schema';

export default {
    default: ({ env }) => ({
        cardTitle: 'Other actions',
        buttons: [],
    }),
    validator: (config) => {
        return configSchema.parse(config);
    },
};