import { z } from 'zod'

export const locationSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  address1: z.string().min(2),
  address2: z.string().optional().nullable(),
  city: z.string().min(2),
  state: z.string().length(2, 'Use 2-letter state, e.g. MD'),
  postalCode: z.string().min(5),
  phone: z.string().min(10),
  website: z.string().url().optional().or(z.literal('')),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
})

export type Location = z.infer<typeof locationSchema>
