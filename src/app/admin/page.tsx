import Link from "next/link";
export default function Admin() {
  return (
    <main className="shell section">
      <p className="eyebrow">GRITSCRIPT / ADMINISTRATION</p>
      <h1 className="section-title">A foundation for what’s next.</h1>
      <p className="muted">
        The administrative workspace is not enabled. Authentication, tenant
        authorization, and a database must be configured before any management
        tools become available.
      </p>
      <Link className="button primary" href="/">
        Return to the catalog
      </Link>
    </main>
  );
}
