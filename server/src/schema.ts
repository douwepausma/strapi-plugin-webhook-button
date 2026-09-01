import { z } from 'zod';

export const buttonSchema = z.object({
    id: z.string().min(1, 'Button ID is required'),
    name: z.string().min(1, 'Button name is required'),
    icon: z.string().optional(),
    variant: z.enum(['default','secondary','tertiary','success','success-light','danger','danger-light','ghost'], 'Invalid button variant').optional(),
    url: z.url('Invalid URL format'),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE'], 'Invalid HTTP method'),
    headers: z.record(z.string(), z.string()).optional(),
    body: z.any().optional(),
    models: z.array(z.string()).optional(),
});

export const configSchema = z.object({
    cardTitle: z.string().optional(),
    buttons: z.array(buttonSchema).refine(
        (buttons) => {
            const ids = buttons.map(b => b.id);
            return new Set(ids).size === ids.length;
        },
        { message: 'Button IDs must be unique' }
    )
});