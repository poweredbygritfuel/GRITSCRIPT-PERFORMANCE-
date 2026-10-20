"use client";
import { useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  Plus,
  Minus,
  FlaskConical,
  ShieldCheck,
  Layers3,
  Menu,
  X,
  Check,
  ChevronDown,
} from "lucide-react";
import { products, summarize, money } from "@/lib/catalog";
export function Storefront() {
  const [category, setCategory] = useState("All supplies");
  const [query, setQuery] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [mobileMenu, setMobileMenu] = useState(false);
  const [delivery, setDelivery] = useState("shipping");
  const [preview, setPreview] = useState(false);
  const summary = summarize(quantities);
  const filtered = products.filter(
    (p) =>
      (category === "All supplies" || p.category === category) &&
      `${p.name} ${p.description} ${p.specification} ${p.id}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const update = (id: string, n: number) => {
    setQuantities((q) => ({
      ...q,
      [id]: Math.max(0, Math.min(99, (q[id] || 0) + n)),
    }));
    setPreview(false);
  };
  return (
    <>
      <div className="announcement">
        <span className="status-dot" /> THE NEXT CHAPTER IN PRECISION{" "}
        <span className="announcement-divider">/</span> PERFORMANCE 2.0
      </div>
      <header className="header shell">
        <a href="#" className="brand" aria-label="GritScript Performance home">
          <span className="brand-symbol">
            G<span>/</span>
          </span>
          <span>
            GRITSCRIPT
            <small>
              PERFORMANCE <b>2.0</b>
            </small>
          </span>
        </a>
        <nav
          className={mobileMenu ? "nav open" : "nav"}
          aria-label="Main navigation"
        >
          <a href="#about" onClick={() => setMobileMenu(false)}>
            Our approach
          </a>
          <a href="#catalog" onClick={() => setMobileMenu(false)}>
            Product catalog
          </a>
          <a href="#standards" onClick={() => setMobileMenu(false)}>
            Our standards
          </a>
        </nav>
        <a href="#inquiry" className="header-inquiry">
          Build an inquiry <ArrowUpRight size={16} />
          <span className="count">{summary.units}</span>
        </a>
        <button
          className="mobile-toggle"
          aria-label={mobileMenu ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileMenu}
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </header>
      <main>
        <section className="hero shell">
          <div className="hero-copy">
            <p className="eyebrow">
              <span /> DRIVEN BY GRIT. DEFINED BY PRECISION.
            </p>
            <h1>
              Precision has
              <br />a <em>purpose.</em>
            </h1>
            <p className="hero-description">
              For the work that demands more. Explore laboratory essentials
              built around clarity, consistency, and the pursuit of progress.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#catalog">
                Explore the catalog <ArrowUpRight size={18} />
              </a>
              <a className="text-link" href="#about">
                Discover GritScript <ArrowRight size={16} />
              </a>
            </div>
            <div className="hero-foot">
              <span className="line-icon">
                <FlaskConical size={20} />
              </span>
              <p>
                LABORATORY ESSENTIALS
                <small>Purpose-built. Research-focused.</small>
              </p>
            </div>
          </div>
          <div className="hero-art">
            <div className="orbital orbital-one" />
            <div className="orbital orbital-two" />
            <div className="art-cross cross-one">+</div>
            <div className="art-cross cross-two">+</div>
            <span className="art-label">GS / LAB ESSENTIALS</span>
            <Image
              className="hero-product"
              src="/products/hero.svg"
              alt="Illustrated laboratory glassware with metallic caps and GritScript labels"
              width={760}
              height={740}
              priority
            />
            <div className="art-bottom">
              <span>
                <i /> PRECISION IN EVERY DETAIL
              </span>
              <span>EST. 2.0 ↗</span>
            </div>
          </div>
        </section>
        <div className="principles">
          <div className="shell principles-inner">
            <span>THE GRITSCRIPT STANDARD</span>
            <p>
              <ShieldCheck size={19} /> Transparent information
            </p>
            <p>
              <FlaskConical size={19} /> Research-focused essentials
            </p>
            <p>
              <Layers3 size={19} /> A considered selection
            </p>
          </div>
        </div>
        <section className="shell section about" id="about">
          <div>
            <p className="eyebrow">01 / THE APPROACH</p>
            <h2 className="section-title">
              Serious about the work.
              <br />
              <span>Intentional about the details.</span>
            </h2>
          </div>
          <div className="about-copy">
            <p>
              Progress begins with a strong foundation. GritScript Performance
              brings a focused, straightforward approach to laboratory
              supplies—so you can spend less time navigating the noise and more
              time on the work ahead.
            </p>
            <a className="text-link" href="#standards">
              Explore our standards <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
        <section id="catalog" className="catalog section">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">02 / THE COLLECTION</p>
                <h2 className="section-title">Equip your next step.</h2>
              </div>
              <p className="muted">
                Everyday essentials. Clearly specified.
                <br />
                Explore our demonstration catalog.
              </p>
            </div>
            <div className="catalog-controls">
              <div className="tabs" aria-label="Product categories">
                {[
                  "All supplies",
                  "Glassware",
                  "Consumables",
                  "Storage",
                  "Equipment",
                ].map((c) => (
                  <button
                    key={c}
                    aria-pressed={c === category}
                    className={c === category ? "active" : ""}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <label className="search">
                <Search size={17} />
                <input
                  aria-label="Search supplies"
                  placeholder="Search supplies or SKU"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
            </div>
            <div className="results-label" aria-live="polite">
              {filtered.length} essentials{" "}
              <span>ILLUSTRATIVE PRODUCTS · DEMO AVAILABILITY</span>
            </div>
            <div className="product-grid">
              {filtered.map((p) => (
                <article className="product-card" key={p.id}>
                  <div className="product-image">
                    <span
                      className={`availability ${p.status === "Available" ? "" : "limited"}`}
                    >
                      <i />
                      {p.status}
                    </span>
                    <Image
                      src={p.image}
                      alt={`Illustration of ${p.name.toLowerCase()}`}
                      width={400}
                      height={300}
                    />
                    <span className="sku">{p.id}</span>
                  </div>
                  <div className="product-body">
                    <p className="product-category">{p.category}</p>
                    <h3>{p.name}</h3>
                    <p className="product-description">{p.description}</p>
                    <p className="specification">{p.specification}</p>
                    <div className="product-bottom">
                      <div>
                        <strong>{money(p.priceCents)}</strong>
                        <small>Illustrative unit price</small>
                      </div>
                      <button
                        className="add-button"
                        disabled={!p.inquiryEligible}
                        onClick={() => update(p.id, 1)}
                        aria-label={
                          p.inquiryEligible
                            ? `Add ${p.name} to inquiry`
                            : `${p.name}: not eligible for inquiry`
                        }
                      >
                        {p.inquiryEligible ? (
                          <>
                            {quantities[p.id] ? (
                              <Check size={16} />
                            ) : (
                              <Plus size={16} />
                            )}{" "}
                            {quantities[p.id]
                              ? `Added (${quantities[p.id]})`
                              : "Add to inquiry"}
                          </>
                        ) : (
                          "Not eligible"
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {!filtered.length && (
              <div className="empty">
                <Search />
                <h3>No supplies found</h3>
                <p>Try another search term or category.</p>
                <button
                  className="text-link"
                  onClick={() => {
                    setQuery("");
                    setCategory("All supplies");
                  }}
                >
                  Reset filters <ArrowRight size={16} />
                </button>
              </div>
            )}
            <div className="catalog-note">
              <ShieldCheck size={18} />
              <p>
                Information first. All items, pricing, and availability shown
                are placeholders. No products are offered for live sale.
              </p>
            </div>
          </div>
        </section>
        <section className="shell section" id="standards">
          <p className="eyebrow">03 / BUILT ON PRINCIPLE</p>
          <div className="section-heading">
            <h2 className="section-title">
              A higher standard.
              <br />
              <span>At every step.</span>
            </h2>
            <p className="muted">
              The right information makes all the difference.
              <br />
              Our foundation is simple.
            </p>
          </div>
          <div className="standards-grid">
            {[
              {
                icon: FlaskConical,
                title: "Purposeful selection",
                text: "A focused catalog of general laboratory essentials, with clear specifications for informed decisions.",
              },
              {
                icon: ShieldCheck,
                title: "Clarity without compromise",
                text: "Transparent product information, visible availability, and a clear distinction between inquiry and purchase.",
              },
              {
                icon: Layers3,
                title: "Built for what’s next",
                text: "An organized request experience designed to support better conversations and more considered workflows.",
              },
            ].map((s, i) => (
              <article key={s.title}>
                <div className="standard-top">
                  <s.icon size={25} />
                  <span>0{i + 1}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="inquiry" className="inquiry-section">
          <div className="shell section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">04 / START A CONVERSATION</p>
                <h2 className="section-title">Your work. Your requirements.</h2>
              </div>
              <p className="muted">
                Build a request in a few simple steps.
                <br />
                No checkout. No payment details.
              </p>
            </div>
            <div className="inquiry-layout">
              <form
                className="inquiry-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (summary.units) setPreview(true);
                }}
                onChange={() => setPreview(false)}
              >
                <div className="form-heading">
                  <span>01</span>
                  <h3>Your details</h3>
                  <span className="demo-tag">LOCAL DEMO</span>
                </div>
                <p className="form-help">
                  Use sample details. Information stays in this page and is not
                  submitted or saved.
                </p>
                <div className="field-grid">
                  <label>
                    Full name
                    <input
                      name="name"
                      autoComplete="off"
                      placeholder="Alex Morgan"
                      required
                      maxLength={100}
                    />
                  </label>
                  <label>
                    Work email
                    <input
                      name="email"
                      type="email"
                      autoComplete="off"
                      placeholder="alex@example.com"
                      required
                      maxLength={150}
                    />
                  </label>
                  <label className="full">
                    Organization
                    <input
                      name="organization"
                      placeholder="Laboratory or organization name"
                      required
                      maxLength={150}
                    />
                  </label>
                </div>
                <div className="form-heading">
                  <span>02</span>
                  <h3>Fulfillment preference</h3>
                </div>
                <div className="delivery-options">
                  {["shipping", "pickup"].map((d) => (
                    <label className={delivery === d ? "selected" : ""} key={d}>
                      <input
                        type="radio"
                        name="delivery"
                        checked={delivery === d}
                        onChange={() => setDelivery(d)}
                      />
                      <span>
                        {d === "shipping" ? "Shipping request" : "Local pickup"}
                        <small>
                          {d === "shipping"
                            ? "Cost to be confirmed"
                            : "Location to be confirmed"}
                        </small>
                      </span>
                    </label>
                  ))}
                </div>
                {delivery === "shipping" && (
                  <div className="field-grid">
                    <label>
                      Destination country
                      <input
                        name="country"
                        placeholder="Country"
                        required
                        maxLength={80}
                      />
                    </label>
                    <label>
                      Postal code
                      <input
                        name="postal"
                        placeholder="Postal code"
                        required
                        maxLength={20}
                      />
                    </label>
                  </div>
                )}
                <label className="notes-label">
                  Additional requirements <span>(optional)</span>
                  <textarea
                    name="notes"
                    rows={3}
                    maxLength={1000}
                    placeholder="Share quantities, timing, or product questions. Do not enter sensitive information."
                  />
                </label>
                <label className="consent">
                  <input required type="checkbox" />
                  <span>
                    I understand this is a demonstration inquiry, not an order,
                    and that product suitability and availability require
                    review.
                  </span>
                </label>
                <button
                  className="button primary preview-button"
                  disabled={!summary.units}
                >
                  Preview request <ArrowUpRight size={18} />
                </button>
                <div
                  role="status"
                  className={preview ? "preview-message" : "sr-only"}
                >
                  {preview
                    ? "Request preview ready. Your summary is shown alongside this form. Nothing has been sent, saved, or ordered."
                    : ""}
                </div>
              </form>
              <aside className="summary">
                <div className="summary-heading">
                  <h3>Request summary</h3>
                  <span>{summary.units} units</span>
                </div>
                {!summary.lines.length ? (
                  <div className="summary-empty">
                    <FlaskConical size={30} />
                    <p>Your next step starts here.</p>
                    <small>
                      Add supplies from the catalog to build your inquiry.
                    </small>
                    <a href="#catalog" className="text-link">
                      Browse supplies <ArrowRight size={15} />
                    </a>
                  </div>
                ) : (
                  <ul className="summary-lines">
                    {summary.lines.map(({ product: p, quantity, subtotal }) => (
                      <li key={p.id}>
                        <div>
                          <strong>{p.name}</strong>
                          <small>
                            {p.id} · {money(p.priceCents)} each
                          </small>
                          <div className="quantity">
                            <button
                              type="button"
                              aria-label={`Remove one ${p.name}`}
                              onClick={() => update(p.id, -1)}
                            >
                              <Minus size={12} />
                            </button>
                            <span>{quantity}</span>
                            <button
                              type="button"
                              disabled={quantity === 99}
                              aria-label={`Add one ${p.name}`}
                              onClick={() => update(p.id, 1)}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                        <strong>{money(subtotal)}</strong>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="summary-totals">
                  <p>
                    <span>Illustrative subtotal</span>
                    <strong>{money(summary.totalCents)}</strong>
                  </p>
                  <p>
                    <span>
                      {delivery === "shipping" ? "Shipping" : "Pickup"}
                    </span>
                    <span>To be confirmed</span>
                  </p>
                  <p>
                    <span>Taxes</span>
                    <span>Not calculated</span>
                  </p>
                  <div className="estimated">
                    <span>Estimated supplies</span>
                    <strong>
                      {money(summary.totalCents)} <small>USD</small>
                    </strong>
                  </div>
                </div>
                <p className="summary-disclaimer">
                  <ShieldCheck size={16} />
                  Preview only. Not a quote or order confirmation. No payment
                  will be requested.
                </p>
              </aside>
            </div>
          </div>
        </section>
        <section className="shell research">
          <div className="research-icon">
            <FlaskConical size={24} />
          </div>
          <div>
            <h3>A responsible approach to research.</h3>
            <p>
              This demonstration catalog features generic laboratory supplies
              only. No research compounds are listed or sold. Research-use
              labeling does not establish legal sale or suitability. Any future
              regulated catalog requires legal review and provider approval
              before activation. Supplies are not presented for human or
              veterinary treatment.
            </p>
          </div>
          <ChevronDown size={20} aria-hidden="true" />
        </section>
      </main>
      <footer className="footer">
        <div className="shell footer-top">
          <a href="#" className="brand">
            <span className="brand-symbol">
              G<span>/</span>
            </span>
            <span>
              GRITSCRIPT
              <small>
                PERFORMANCE <b>2.0</b>
              </small>
            </span>
          </a>
          <p>
            Built on grit.
            <br />
            <span>Driven by what’s next.</span>
          </p>
          <div>
            <a href="#catalog">
              Product catalog <ArrowUpRight size={14} />
            </a>
            <a href="#inquiry">
              Product inquiries <ArrowUpRight size={14} />
            </a>
            <a href="#standards">
              Our standards <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>
            © {new Date().getFullYear()} GritScript Performance. All rights
            reserved.
          </span>
          <span>DEMONSTRATION WEBSITE · NO LIVE SALES</span>
          <a href="#">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
