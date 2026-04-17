import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearAuthSession } from "../../utils/authStorage";
import { APP_ROUTES } from "../../utils/legacyRoutes";

const adminNavItems = [
  { key: "overview", label: "Dashboard", icon: "dashboard", to: APP_ROUTES.admin },
  { key: "users", label: "User Management", icon: "groups", to: APP_ROUTES.adminUsers },
  { key: "content", label: "Content Manager", icon: "edit_note", to: APP_ROUTES.adminContent },
  { key: "auctions", label: "Auction Sessions", icon: "gavel", to: APP_ROUTES.adminAuctions },
  { key: "settings", label: "Settings", icon: "settings", to: APP_ROUTES.adminSettings },
];

const topSearchPlaceholders = {
  overview: "Search collectibles or collectors...",
  users: "Search collectors, curators...",
  auctions: "Search auctions, items, or sellers...",
  content: "Search articles, drops, or tags...",
  settings: "Search settings...",
};

function resolveSection(pathname) {
  if (pathname.startsWith(APP_ROUTES.adminUsers)) {
    return "users";
  }

  if (pathname.startsWith(APP_ROUTES.adminContent)) {
    return "content";
  }

  if (pathname.startsWith(APP_ROUTES.adminAuctions)) {
    return "auctions";
  }

  if (pathname.startsWith(APP_ROUTES.adminSettings)) {
    return "settings";
  }

  return "overview";
}

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function AdminMetricCard({ icon, title, value, hint, hintTone = "text-emerald-600" }) {
  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
      <div className="mb-4 flex items-start justify-between">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf2ff] text-[#2f5fcb]">
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </span>
        {hint ? <span className={cx("text-xs font-semibold", hintTone)}>{hint}</span> : null}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{title}</p>
      <p className="mt-1 text-4xl font-black leading-none text-slate-800">{value}</p>
    </article>
  );
}

function StatusPill({ status }) {
  const map = {
    success: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    verified: "bg-blue-100 text-blue-700",
    logged: "bg-slate-200 text-slate-600",
    live: "bg-red-100 text-red-600",
    scheduled: "bg-slate-100 text-slate-500",
    ended: "bg-slate-700 text-white",
    critical: "bg-red-600 text-white",
    flagged: "bg-red-100 text-red-700",
  };

  return (
    <span className={cx("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide", map[status] || "bg-slate-100 text-slate-700")}>{status}</span>
  );
}

function OverviewSection() {
  const activityRows = [
    { user: "KuroNeko_99", action: "Placed Bid", target: "Eva-01 Metal Build", time: "12:45 PM", status: "success" },
    { user: "MochiDesign", action: "Withdrawal Request", target: "$450.00 Credit", time: "12:42 PM", status: "pending" },
    { user: "AkiraS_92", action: "Account Creation", target: "New Tier: Collector", time: "12:30 PM", status: "verified" },
    { user: "ZeroTwoFan", action: "Outbid Notice", target: "Scale 1/7 Mai Sakurajima", time: "12:15 PM", status: "logged" },
  ];

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900">Pulse Overview</h1>
          <p className="mt-2 text-lg text-slate-500">Live tracking of the digital vault ecosystem.</p>
        </div>
        <span className="rounded-full bg-[#e6edff] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#2f5fcb]">Last updated: 2m ago</span>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard icon="group" title="Total Users" value="14,282" hint="+12%" />
        <AdminMetricCard icon="gavel" title="Active Auctions" value="156" hint="Live" hintTone="text-red-600" />
        <AdminMetricCard icon="payments" title="Total Revenue" value="$1.2M" hint="+8.4%" />
        <AdminMetricCard icon="shield" title="Pending Verifications" value="42" hint="Priority" hintTone="text-slate-700" />
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[2fr_1fr]">
        <article className="rounded-2xl border border-slate-100 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900">Recent User Activity</h2>
            <button type="button" className="text-sm font-semibold text-[#2f5fcb] hover:underline">View All Records</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  <th className="py-3 pr-4">Collector</th>
                  <th className="py-3 pr-4">Action</th>
                  <th className="py-3 pr-4">Target Entity</th>
                  <th className="py-3 pr-4">Timestamp</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {activityRows.map((row) => (
                  <tr key={`${row.user}-${row.time}`} className="border-b border-slate-100 last:border-0">
                    <td className="py-4 pr-4">
                      <p className="font-semibold text-slate-800">{row.user}</p>
                      <p className="text-xs text-slate-400">ID: {row.time.replace(":", "")}</p>
                    </td>
                    <td className="py-4 pr-4 text-sm text-slate-600">{row.action}</td>
                    <td className="py-4 pr-4 text-sm text-slate-600">{row.target}</td>
                    <td className="py-4 pr-4 text-sm text-slate-400">{row.time}</td>
                    <td className="py-4"><StatusPill status={row.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <div className="space-y-4">
          <article className="rounded-2xl border border-slate-100 bg-white p-5">
            <h3 className="mb-4 text-xl font-black text-slate-900">Quick Actions</h3>
            <div className="space-y-3">
              {[
                { icon: "campaign", title: "Broadcast Alert", subtitle: "Send notification to all users", tone: "bg-red-100 text-red-600" },
                { icon: "policy", title: "Review Disputed Bid", subtitle: "Manual verification of high-value auctions", tone: "bg-blue-100 text-blue-600" },
                { icon: "receipt_long", title: "Generate Daily Report", subtitle: "Export financial & activity logs", tone: "bg-amber-100 text-amber-700" },
              ].map((item) => (
                <button type="button" key={item.title} className="flex w-full items-center gap-3 rounded-xl bg-[#f4f6fd] p-4 text-left hover:bg-[#e9edfb]">
                  <span className={cx("inline-flex h-9 w-9 items-center justify-center rounded-lg", item.tone)}>
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-bold text-slate-800">{item.title}</span>
                    <span className="block text-xs text-slate-500">{item.subtitle}</span>
                  </span>
                  <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                </button>
              ))}
            </div>
          </article>

          <article className="rounded-2xl bg-[#253149] p-5 text-white">
            <h3 className="text-xl font-black">Vault Security</h3>
            <p className="mt-3 text-sm text-slate-300">System integrity is currently at 100%. No unauthorized access attempts detected in last 24h.</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700">
              <div className="h-full w-[86%] bg-emerald-400" />
            </div>
            <p className="mt-2 text-right text-xs font-semibold uppercase tracking-wide text-emerald-300">Secured</p>
          </article>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[2fr_1fr]">
        <article className="rounded-2xl border border-slate-100 bg-[#eaf0fd] p-6">
          <h3 className="text-3xl font-black text-slate-900">Scheduled Maintenance</h3>
          <p className="mt-2 max-w-3xl text-slate-600">System upgrade scheduled for 02:00 AM UTC on Sunday. This will affect bidding functionality for approximately 45 minutes.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">Confirm Schedule</button>
            <button type="button" className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Reschedule</button>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-100 bg-white p-5">
          <h3 className="text-xl font-black text-slate-900">Trending Collections</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center justify-between"><span className="text-slate-700">Gundam Seed Freedom</span><span className="font-semibold text-emerald-600">+245%</span></li>
            <li className="flex items-center justify-between"><span className="text-slate-700">Spy x Family: Code White</span><span className="font-semibold text-emerald-600">+112%</span></li>
            <li className="flex items-center justify-between"><span className="text-slate-700">Hololive Summer 2024</span><span className="font-semibold text-emerald-600">+89%</span></li>
          </ul>
        </article>
      </section>
    </div>
  );
}

function UserManagementSection() {
  const users = [
    { name: "Takumi Arisawa", email: "takumi.a@akibapulse.com", role: "Curator", status: "Verified", joined: "Oct 12, 2023" },
    { name: "Yuki Sora", email: "yuki.collector@gmail.com", role: "Collector", status: "Pending", joined: "Jan 04, 2024" },
    { name: "Kenji Sato", email: "admin.kenji@akibapulse.com", role: "Admin", status: "Verified", joined: "Sep 30, 2022" },
    { name: "Hina Matsu", email: "hina.matsu@nexus.net", role: "Collector", status: "Flagged", joined: "Feb 18, 2024" },
    { name: "Daiki Chen", email: "daiki.rare@akibapulse.com", role: "Curator", status: "Verified", joined: "Dec 01, 2023" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">Admin &gt; User Management</p>
        <h1 className="text-5xl font-black tracking-tight text-slate-900">User Directory</h1>
        <p className="mt-2 text-lg text-slate-500">Manage the pulse of the collection ecosystem.</p>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard icon="group" title="Total Users" value="12,482" hint="+12%" />
        <AdminMetricCard icon="person" title="Active Now" value="842" hint="●" hintTone="text-emerald-500" />
        <AdminMetricCard icon="shield_person" title="Pending Verification" value="156" hint="Action Required" hintTone="text-red-600" />
        <AdminMetricCard icon="warning" title="Flagged Accounts" value="24" hint="High Priority" hintTone="text-red-600" />
      </section>

      <article className="rounded-2xl border border-slate-100 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-xl bg-[#eef2fc] p-1 text-sm font-semibold text-slate-600">
            <button type="button" className="rounded-lg bg-white px-4 py-1 text-red-600">All Users</button>
            <button type="button" className="rounded-lg px-4 py-1 hover:bg-white">Admins</button>
            <button type="button" className="rounded-lg px-4 py-1 hover:bg-white">Curators</button>
          </div>
          <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-100 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                <th className="py-3 pr-4">User</th>
                <th className="py-3 pr-4">Role</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Joined Date</th>
                <th className="py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email} className="border-b border-slate-100 last:border-0">
                  <td className="py-4 pr-4">
                    <p className="font-semibold text-slate-800">{user.name}</p>
                    <p className="text-sm text-slate-400">{user.email}</p>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="rounded-full bg-[#eaf0ff] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#2f5fcb]">{user.role}</span>
                  </td>
                  <td className="py-4 pr-4">
                    <StatusPill status={user.status.toLowerCase()} />
                  </td>
                  <td className="py-4 pr-4 text-sm text-slate-500">{user.joined}</td>
                  <td className="py-4 text-right">
                    {user.status === "Pending" ? (
                      <button type="button" className="rounded-lg bg-emerald-100 px-4 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-200">Verify</button>
                    ) : user.status === "Flagged" ? (
                      <button type="button" className="rounded-lg bg-red-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-red-500">Investigate</button>
                    ) : (
                      <button type="button" className="rounded-lg px-4 py-1.5 text-xs font-semibold text-slate-400 hover:bg-slate-100">Protected</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="rounded-2xl border border-[#2f5fcb]/30 bg-[#f0f5ff] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black text-slate-900">Bulk Verification Queue</h3>
            <p className="mt-1 text-slate-600">There are <span className="font-bold text-[#2f5fcb]">15 pending Curators</span> waiting for profile review and document verification.</p>
          </div>
          <button type="button" className="rounded-xl bg-[#2f5fcb] px-6 py-3 text-sm font-semibold text-white hover:bg-[#234ea8]">Open Review Queue</button>
        </div>
      </article>
    </div>
  );
}

function AuctionSection() {
  const rows = [
    { item: "EVA-01 Test Type: DYNA-Model", status: "live", seller: "Mecha_King77", bid: "¥75,400", time: "00:42:12", signal: "28 bids" },
    { item: "AKIRA Limited HC Boxset", status: "scheduled", seller: "TheCollector_JP", bid: "¥120,000", time: "Starts in 4h", signal: "Starting bid" },
    { item: "Cyber-Mod Watch Ver2.0", status: "ended", seller: "Synth_Mind", bid: "¥45,000", time: "Completed", signal: "Final price" },
    { item: "Signed Kaneda Bike Concept Art", status: "critical", seller: "Vault_Archivist", bid: "¥2,450,000", time: "00:02:14", signal: "Hot item" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Main View &gt; Auction Management</p>
          <h1 className="text-5xl font-black tracking-tight text-slate-900">Live Auction Hub</h1>
        </div>
        <div className="inline-flex rounded-xl bg-[#eef2fc] p-1 text-sm font-semibold text-slate-600">
          <button type="button" className="rounded-lg bg-white px-4 py-1 text-red-600">Active</button>
          <button type="button" className="rounded-lg px-4 py-1 hover:bg-white">History</button>
          <button type="button" className="rounded-lg px-4 py-1 hover:bg-white">Queue</button>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard icon="radio_button_checked" title="Total Live" value="42" hint="+12% from last hour" />
        <AdminMetricCard icon="payments" title="Current Pool" value="¥12.4M" hint="Active bid volume" hintTone="text-slate-600" />
        <AdminMetricCard icon="schedule" title="Ending Soon" value="08" hint="Under 15 minutes" hintTone="text-red-600" />
        <AdminMetricCard icon="bolt" title="System Load" value="Optimal" hint="No latency detected" hintTone="text-blue-600" />
      </section>

      <article className="rounded-2xl border border-slate-100 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900">Session Monitor</h2>
          <div className="text-xs font-semibold text-slate-500">
            <span className="text-emerald-600">● 42 items live</span>
            <span className="mx-2">|</span>
            <span>15 scheduled</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-100 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                <th className="py-3 pr-4">Item Details</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Seller</th>
                <th className="py-3 pr-4">Current Bid</th>
                <th className="py-3 pr-4">Time Left</th>
                <th className="py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.item} className="border-b border-slate-100 last:border-0">
                  <td className="py-4 pr-4 font-semibold text-slate-800">{row.item}</td>
                  <td className="py-4 pr-4"><StatusPill status={row.status} /></td>
                  <td className="py-4 pr-4 text-sm text-slate-600">{row.seller}</td>
                  <td className="py-4 pr-4">
                    <p className="font-bold text-slate-800">{row.bid}</p>
                    <p className="text-xs text-emerald-600">{row.signal}</p>
                  </td>
                  <td className="py-4 pr-4 text-sm font-semibold text-red-600">{row.time}</td>
                  <td className="py-4 text-right">
                    <button type="button" className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
}

function ContentSection() {
  const drafts = [
    { type: "Announcements", date: "24 Oct 2023", title: "Summer 2024 Collection: The Cyber-Samurai Series", author: "Satoshi K.", status: "published" },
    { type: "Auction News", date: "21 Oct 2023", title: "Understanding Rare-Tier Grading for Vinyl Collectibles", author: "Elena Vance", status: "draft" },
    { type: "Platform", date: "18 Oct 2023", title: "Maintenance Update: Protocol 009 Implementation", author: "System Admin", status: "published" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900">Content Manager</h1>
          <p className="mt-2 max-w-4xl text-lg text-slate-500">Orchestrate the pulse of Akihabara. Manage news drops, featured collections, and platform-wide announcements.</p>
        </div>
        <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-[#d81626] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(216,22,38,0.25)] hover:bg-[#bc1020]">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Create New Article
        </button>
      </div>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[2fr_1fr]">
        <article className="rounded-2xl border border-slate-100 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900">Recent Drafts & Drops</h2>
            <div className="inline-flex rounded-xl bg-[#eef2fc] p-1 text-xs font-semibold text-slate-600">
              <button type="button" className="rounded-lg bg-white px-3 py-1 text-[#2f5fcb]">All</button>
              <button type="button" className="rounded-lg px-3 py-1 hover:bg-white">Published</button>
              <button type="button" className="rounded-lg px-3 py-1 hover:bg-white">Drafts</button>
            </div>
          </div>

          <div className="space-y-3">
            {drafts.map((draft) => (
              <article key={draft.title} className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-100 bg-[#f8f9fe] p-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-[#5aa4d9] text-white">
                  <span className="material-symbols-outlined">article</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#eaf0ff] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#2f5fcb]">{draft.type}</span>
                    <span className="text-xs text-slate-400">{draft.date}</span>
                  </div>
                  <h3 className="line-clamp-1 text-lg font-black text-slate-800">{draft.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{draft.author}</p>
                </div>
                <StatusPill status={draft.status} />
              </article>
            ))}
          </div>
        </article>

        <div className="space-y-4">
          <article className="rounded-2xl border border-slate-100 bg-[#f1f4fc] p-5">
            <h3 className="text-xl font-black text-slate-900">Article Preview</h3>
            <img
              className="mt-4 h-36 w-full rounded-xl object-cover"
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
              alt="Article preview"
            />
            <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-red-600">Featured Spotlight</p>
            <h4 className="mt-1 text-3xl font-black leading-tight text-slate-900">Mastering the Drop: A Collector's Guide</h4>
            <p className="mt-2 text-sm text-slate-500">Preview how your lead article appears on the main landing page. Typography and spacing are auto-adjusted for editorial impact.</p>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-[#e8efff] p-5">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Performance Metrics</h3>
            <div className="mt-4 space-y-3">
              <div>
                <div className="mb-1 flex items-center justify-between text-sm font-semibold text-slate-700"><span>Total News Reach</span><span>12.4K</span></div>
                <div className="h-1.5 rounded-full bg-white/70"><div className="h-full w-[78%] rounded-full bg-red-600" /></div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-sm font-semibold text-slate-700"><span>Engagement Rate</span><span>8.2%</span></div>
                <div className="h-1.5 rounded-full bg-white/70"><div className="h-full w-[52%] rounded-full bg-[#2f5fcb]" /></div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { icon: "campaign", title: "Global Alert", desc: "Push high-priority banners to all active sessions across the platform." },
          { icon: "inventory_2", title: "Collection Drops", desc: "Manage the featured drop carousel on the homepage." },
          { icon: "auto_awesome", title: "Weekly Digest", desc: "Curate the newsletter for subscribed elite collectors." },
        ].map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-100 bg-white p-5">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf0ff] text-[#2f5fcb]">
              <span className="material-symbols-outlined text-[19px]">{item.icon}</span>
            </span>
            <h3 className="mt-4 text-xl font-black text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{item.desc}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function SettingsSection() {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-8">
      <h1 className="text-4xl font-black tracking-tight text-slate-900">System Settings</h1>
      <p className="mt-2 text-slate-500">Configure platform policies, access controls, and real-time notification settings.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {[
          { title: "Auction Guardrails", desc: "Set reserve threshold, anti-snipe timer, and emergency pause rules." },
          { title: "Moderator Permissions", desc: "Adjust role matrix for admin, curator, and reviewer accounts." },
          { title: "Broadcast Channels", desc: "Choose enabled channels for alerts: email, push, and in-app banners." },
          { title: "Settlement Windows", desc: "Define payment deadlines and auto-cancel conditions for winning bids." },
        ].map((item) => (
          <article key={item.title} className="rounded-xl border border-slate-100 bg-[#f7f9ff] p-5">
            <h2 className="text-xl font-black text-slate-900">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-500">{item.desc}</p>
            <button type="button" className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Update</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function DashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = resolveSection(location.pathname);

  const handleLogout = () => {
    clearAuthSession();
    navigate(APP_ROUTES.login, { replace: true });
  };

  return (
    <main className="min-h-screen bg-[#f2f4fa] text-slate-800">
      <div className="mx-auto grid max-w-[1720px] lg:grid-cols-[250px_1fr]">
        <aside className="border-b border-slate-200 bg-[#edf0f6] p-6 lg:min-h-screen lg:border-b-0 lg:border-r">
          <div>
            <p className="text-2xl font-black tracking-[0.14em] text-red-600">KINETIC ADMIN</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">The Neon Curator</p>
          </div>

          <nav className="mt-8 space-y-1">
            {adminNavItems.map((item) => {
              const isActive = item.key === activeSection;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cx(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                    isActive ? "bg-white text-red-600 shadow-sm" : "text-slate-600 hover:bg-white/70",
                  )}
                >
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-10 rounded-xl bg-red-600 p-4 text-center">
            <button type="button" className="inline-flex items-center gap-2 text-sm font-bold text-white">
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              Create New Drop
            </button>
          </div>

          <div className="mt-8 flex items-center justify-between rounded-xl bg-white p-3">
            <div>
              <p className="text-sm font-bold text-slate-800">Admin Panel</p>
              <p className="text-xs text-slate-500">System Admin</p>
            </div>
            <button type="button" onClick={handleLogout} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700" aria-label="Logout">
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </aside>

        <section className="px-4 py-6 md:px-8 lg:px-10">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <label className="relative block w-full max-w-md">
              <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-slate-400">search</span>
              <input
                type="search"
                placeholder={topSearchPlaceholders[activeSection]}
                className="w-full rounded-full border border-transparent bg-[#e7ecf9] py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#2f5fcb] focus:bg-white focus:outline-none"
              />
            </label>

            <div className="flex items-center gap-2">
              {[
                { icon: "notifications" },
                { icon: "settings" },
              ].map((item) => (
                <button key={item.icon} type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm hover:text-slate-700">
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                </button>
              ))}
            </div>
          </header>

          {activeSection === "overview" ? <OverviewSection /> : null}
          {activeSection === "users" ? <UserManagementSection /> : null}
          {activeSection === "auctions" ? <AuctionSection /> : null}
          {activeSection === "content" ? <ContentSection /> : null}
          {activeSection === "settings" ? <SettingsSection /> : null}
        </section>
      </div>
    </main>
  );
}
