import { z } from 'zod'

export const quoteSchema = z.object({
  contact: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    company: z.string().min(2),
    address: z.string().optional()
  }),
  product: z.object({
    type: z.string().min(2),
    quantity: z.coerce.number().int().nonnegative(),
    volume: z.string().optional(),
    weight: z.string().optional(),
    photoUrl: z.string().url().optional()
  }),
  trade: z.object({
    hsCode: z.string().min(4),
    origin: z.string().min(2),
    incoterm: z.string().optional(),
    port: z.enum(['Manzanillo', 'Altamira', 'Veracruz']).optional()
  }),
  service: z.object({
    frequency: z.string().optional(),
    destinations: z.string().optional(),
    storageRequired: z.coerce.boolean(),
    conditions: z.array(z.string()).optional().default([]),
    timing: z.string().optional()
  }).optional(),
  options: z.object({
    tracking: z.boolean().optional(),
    packaging: z.boolean().optional(),
    insurance: z.boolean().optional(),
    other: z.string().optional()
  }).partial().optional(),
  comments: z.string().optional()
})


