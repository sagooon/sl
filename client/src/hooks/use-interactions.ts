import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useLogInteraction() {
  return useMutation({
    mutationFn: async (type: 'open' | 'scroll' | 'play') => {
      const res = await fetch(api.interactions.log.path, {
        method: api.interactions.log.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          timestamp: new Date().toISOString()
        }),
      });
      if (!res.ok) throw new Error("Failed to log interaction");
      return await res.json();
    },
  });
}
