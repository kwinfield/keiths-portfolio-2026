import { z } from 'zod'

export const locationSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Business name is required'),
  address1: z.string().min(2, 'Address line 1 is required'),
  address2: z.string().optional().nullable(),
  city: z.string().min(2, 'City is required'),
  state: z.string().length(2, 'Use 2-letter state, e.g. MD'),
  postalCode: z.string().min(5, 'Postal/ZIP code looks too short'),
  phone: z.string().min(10, 'Phone number looks too short'),
  website: z.string().url('Website must be a valid URL').optional().or(z.literal('')),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
})

export type Location = z.infer<typeof locationSchema>
