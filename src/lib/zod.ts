import { z } from 'zod'

export const quoteSchema = z.object({
  contact: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
    address: z.string().optional(),
    title: z.string().optional(),
  }).partial(),
  product: z.object({
    type: z.string().optional(),
    quantity: z.coerce.number().optional(),
    volume: z.string().optional(),
    weight: z.string().optional(),
    photoUrl: z.string().optional()
  }).partial(),
  trade: z.object({
    hsCode: z.string().optional(),
    origin: z.string().optional(),
    incoterm: z.string().optional(),
    port: z.string().optional()
  }).partial(),
  service: z.object({
    frequency: z.string().optional(),
    destinations: z.string().optional(),
    storageRequired: z.coerce.boolean().optional().default(false),
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


