import { z } from 'zod'

// Form fields arrive from FormData, so absent inputs are `null` — accept null/undefined everywhere.
const text = z.string().trim().max(5000).nullish()

export const quoteSchema = z.object({
  contact: z.object({
    name: text,
    email: z.email().max(200),
    phone: text,
    company: text,
    address: text,
    title: text,
    postalCode: text,
    website: text,
  }),
  product: z.object({
    type: text,
    quantity: z.coerce.number().nullish(),
    volume: text,
    weight: text,
    photoUrl: text,
    photos: z.array(z.object({ name: z.string(), type: z.string().optional(), size: z.number().optional() })).nullish(),
  }).partial().optional(),
  trade: z.object({
    hsCode: text,
    origin: text,
    incoterm: text,
    port: text,
  }).partial().optional(),
  service: z.object({
    frequency: text,
    destinations: text,
    storageRequired: z.coerce.boolean().optional().default(false),
    conditions: z.array(z.string()).optional().default([]),
    timing: text,
  }).optional(),
  options: z.object({
    tracking: z.boolean().optional(),
    packaging: z.boolean().optional(),
    insurance: z.boolean().optional(),
    other: text,
  }).partial().optional(),
  interests: z.array(z.string().max(200)).max(50).optional(),
  comments: text,
  captchaToken: z.string().optional(),
})
