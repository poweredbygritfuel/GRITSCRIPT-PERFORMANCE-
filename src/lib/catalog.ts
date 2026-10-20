export type Product = {
  id: string;
  businessId: string;
  name: string;
  category: string;
  description: string;
  specification: string;
  priceCents: number;
  status: "Available" | "Limited availability" | "Unavailable";
  inquiryEligible: boolean;
  image: string;
};
export const business = {
  id: "gritscript",
  name: "GRITSCRIPT PERFORMANCE",
  currency: "USD",
} as const;
export const products: Product[] = [
  {
    id: "GS-001",
    businessId: business.id,
    name: "Borosilicate beaker set",
    category: "Glassware",
    description:
      "A dependable foundation for everyday laboratory preparation. Three graduated, low-form beakers.",
    specification: "50 / 100 / 250 mL · Borosilicate 3.3 · Set of 3",
    priceCents: 3200,
    status: "Available",
    inquiryEligible: true,
    image: "/products/beakers.svg",
  },
  {
    id: "GS-002",
    businessId: business.id,
    name: "Precision transfer pipettes",
    category: "Consumables",
    description:
      "Disposable transfer pipettes for controlled liquid handling in general laboratory workflows.",
    specification: "3 mL · LDPE · Non-sterile · Pack of 100",
    priceCents: 1800,
    status: "Available",
    inquiryEligible: true,
    image: "/products/pipettes.svg",
  },
  {
    id: "GS-003",
    businessId: business.id,
    name: "Sample storage vials",
    category: "Storage",
    description:
      "Clear glass sample containers with screw caps for organized, general-purpose sample storage.",
    specification: "20 mL · Clear glass · Pack of 12",
    priceCents: 2400,
    status: "Limited availability",
    inquiryEligible: true,
    image: "/products/vials.svg",
  },
  {
    id: "GS-004",
    businessId: business.id,
    name: "Laboratory tube rack",
    category: "Equipment",
    description:
      "A stable, reusable workspace for sorting and organizing laboratory sample tubes.",
    specification: "24 positions · Polypropylene · 15 mL tubes",
    priceCents: 2200,
    status: "Unavailable",
    inquiryEligible: false,
    image: "/products/rack.svg",
  },
];
export const money = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: business.currency,
  }).format(cents / 100);
export function summarize(
  quantities: Record<string, number>,
  businessId: string = business.id,
) {
  const lines = products
    .filter(
      (p) =>
        p.businessId === businessId &&
        p.inquiryEligible &&
        p.status !== "Unavailable",
    )
    .flatMap((product) => {
      const quantity = quantities[product.id] ?? 0;
      return Number.isInteger(quantity) && quantity > 0 && quantity <= 99
        ? [{ product, quantity, subtotal: product.priceCents * quantity }]
        : [];
    });
  return {
    lines,
    totalCents: lines.reduce((sum, line) => sum + line.subtotal, 0),
    units: lines.reduce((sum, line) => sum + line.quantity, 0),
  };
}
