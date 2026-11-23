/** Tabs across the top of the Tap admin: stock (Plates) vs signed-up customers. */
export function AdminTabs({ active, plates, customers }: { active: "plates" | "customers"; plates: number; customers: number }) {
  const tabs = [
    { key: "plates", href: "/tap/admin", label: "Plates", count: plates },
    { key: "customers", href: "/tap/admin/customers", label: "Customers", count: customers },
  ] as const;
  return (
    <nav aria-label="Admin sections" className="mt-6 inline-flex rounded-full border border-line bg-card p-1 shadow-lift">
      {tabs.map((t) => (
        <a
          key={t.key}
          href={t.href}
          aria-current={active === t.key ? "page" : undefined}
          className={`inline-flex min-h-10 items-center gap-2 rounded-full px-5 text-[0.9rem] font-medium transition-colors ${
            active === t.key ? "bg-ink text-paper" : "text-ink-2 hover:text-ink"
          }`}
        >
          {t.label}
          <span className={`rounded-full px-2 text-[0.75rem] ${active === t.key ? "bg-paper/15" : "bg-paper-3"}`}>{t.count}</span>
        </a>
      ))}
    </nav>
  );
}
