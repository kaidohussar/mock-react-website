export type PricingPlans = {
  model: string
  badges?: string[]
  price: number
  priceMonth: number
  features: Feature[]
}

type Feature = {
  key: string
  isAvailable: boolean
}

const featureKeys = [
  'activeUsers',
  'projectIntegrations',
  'analyticsModule',
  'financeModule',
  'accountingModule',
  'networkPlatform',
  'unlimitedCloudSpace',
]

export const pricingPlans: PricingPlans[] = [
  {
    model: 'Startup',
    price: 39,
    priceMonth: 5,
    features: featureKeys.map((key, i) => ({ key, isAvailable: i < 3 })),
  },
  {
    model: 'Advanced',
    price: 339,
    priceMonth: 35,
    features: featureKeys.map((key, i) => ({ key, isAvailable: i < 5 })),
    badges: ['popularChoice'],
  },
  {
    model: 'Enterprise',
    price: 999,
    priceMonth: 100,
    features: featureKeys.map((key) => ({ key, isAvailable: true })),
  },
]
