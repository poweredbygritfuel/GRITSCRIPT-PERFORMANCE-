/** Future server repository contracts. No persistence or authorization is enabled. */
import type { Product } from "./catalog";
export type TenantContext = Readonly<{
  businessId: string;
  actorId: string;
  role: "owner" | "catalog-manager" | "inquiry-reviewer";
}>;
export interface ProductRepository {
  listForBusiness(context: TenantContext): Promise<readonly Product[]>;
  findForBusiness(
    context: TenantContext,
    productId: string,
  ): Promise<Product | null>;
}
export interface InventoryRepository {
  getAvailability(
    context: TenantContext,
    productId: string,
  ): Promise<{ available: number; version: number }>;
}
export type InquiryDraft = {
  lines: readonly { productId: string; quantity: number }[];
  contact: { name: string; email: string; organization: string };
  fulfillment:
    | { method: "pickup" }
    | { method: "shipping"; country: string; postalCode: string };
  notes?: string;
};
export interface InquiryService {
  /** Implementations must authorize the tenant and validate/reprice every line server-side. */
  createDraft(
    context: TenantContext,
    draft: InquiryDraft,
    idempotencyKey: string,
  ): Promise<{ id: string; status: "pending-review" }>;
}
