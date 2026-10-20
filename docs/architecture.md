# Architecture and activation plan

## Current boundary

The homepage is a static-renderable Next.js route with client-side catalog filtering and ephemeral inquiry state. There are no submission endpoints, external form integrations, authentication providers, secrets, or database connections. `/admin` offers no management functionality and is not an authentication implementation. The EZFormz-style flow is a custom interface, not a connection to EZFormz.

`Product.businessId` and the business configuration establish the future tenant boundary. The current catalog has one fixture business. Filtering by business in the client is only presentation logic, never a security control. Production authorization must be enforced at the server and database.

## Future domain model

Use PostgreSQL with reviewed migrations and a server-only repository layer. Suggested entities:

- Business: id, slug (unique), display name, currency, fulfillment configuration, review status.
- User and Membership: identity-provider subject; businessId + userId unique; role (owner, catalog manager, inquiry reviewer).
- Product: id, businessId, SKU (unique within business), name, description, category, specifications, image reference, inquiry eligibility, regulatory review state, active status, integer price cents.
- Inventory: businessId, productId, on-hand and reserved quantities, optimistic-lock version, updated timestamp. Inventory events should be append-only and transactionally applied.
- Inquiry and InquiryLine: businessId, reviewer status, fulfillment preference, contact reference; immutable SKU, description, price and quantity snapshots. An inquiry never reserves stock or becomes an order automatically.
- AuditEvent: businessId, actor, action, target, timestamp, safe change metadata.

Use composite foreign keys containing businessId, row-level security, and least-privilege database roles to prevent cross-business relationships. Resolve the business from a verified host/slug mapping. Derive access from the authenticated session and membership; do not trust request-supplied tenant IDs. Verify tenant isolation in integration tests before launch.

## Service boundaries

Replace fixture access with `ProductRepository.listForBusiness`, `InventoryRepository.getAvailability`, and `InquiryService.createDraft`. Keep repository implementations server-only. A future submission handler must validate IDs, quantities, business ownership, eligibility, inventory status, fulfillment fields, and consent server-side; recompute monetary totals from trusted data. Never accept client prices as authoritative. Add transaction handling, idempotency, rate limits, CSRF/origin protection, structured error handling, and abuse controls. Recheck stock on review; displayed availability is not a reservation.

## Authenticated administration

Choose a maintained OIDC/session provider. Require server-side session checks for every administrative route and mutation, membership and role checks per business, secure HttpOnly cookies, appropriate SameSite settings, and MFA for privileged users. Do not add an unprotected CRUD dashboard behind a cosmetic login screen. Add product/inventory management only after authorization and auditing are tested. Use signed uploads, file type/size limits, and private object-storage policies for future assets.

## Personal data

Before enabling inquiry delivery, publish a privacy notice and retention policy, identify the recipient and lawful purpose, collect only necessary fields, restrict access by role, and implement deletion/export workflows. Avoid PII in URLs and logs. Encrypt transit/storage and configure approved email/form providers. The current preview deliberately sends no data.

## Compliance and deployment gates

Generic supplies here are placeholders; stock, suitability, and prices are unverified. Research-use disclaimers do not establish lawfulness. Any real catalog, especially regulated products or research compounds, requires documented product/jurisdiction legal review, fulfillment restrictions, and hosting/form/payment provider approval. No payments or live sales may be activated before those checks. Keep legal review state separate from merchandising eligibility.

Use a separate staging deployment with synthetic data first. Verify keyboard navigation, contrast, assistive technology, mobile layouts, security headers, privacy behavior, tenant isolation, and operational monitoring. Add database backups, migration rollback plans, error reporting with PII redaction, and CI checks before production. The present PR does not configure deployment, production secrets, or DNS.
