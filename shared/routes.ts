
import { z } from 'zod';
import { insertInteractionSchema } from './schema';

export const api = {
  interactions: {
    log: {
      method: 'POST' as const,
      path: '/api/interactions' as const,
      input: insertInteractionSchema,
      responses: {
        200: z.object({ success: z.boolean() }),
      },
    },
  },
};
