import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BrainCircuit, Check, Sparkles as SparkIcon } from "lucide-react";
import { z } from "zod";
import { useAppState } from "@/lib/store";
import { recallMeetingMemory, reflectOnMeetingContext } from "@/lib/hindsight";
import { Avatar, Card, PageHeader, Relevance, TypeBadge, btnPrimary, inputCls } from "@/components/nx";

const search = z.object({
  contact: z.string().optional(),
  title: z.string().optional(),
  purpose: z.string().optional(),
  date: z.string().optional(),
  auto: z.boolean().optional(),
});

export const Route = createFileRoute("/prepare")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Prepare a Meeting – Nexora" },
      { name: "description", content: "Generate a personalized meeting brief from everything Nexora remembers about your contact." },
      { property: "og:title", content: "Prepare a Meeting – Nexora" },
      { property: "og:description", content: "Personalized meeting briefs from persistent memory." },
    ],
  }),
  component: Prepare,
});

const STEPS = ["Recalling past meetings", "Ranking relevant memories", "Reflecting on context", "Writing your brief"];

function Prepare() {
  const sp = Route.useSearch();
  const s = useAppState();
  const navigate = useNavigate();
  const [contactId, setContactId] = useState(sp.contact ?? "rahul");
  const [title, setTitle] = useState(sp.title ?? "");
  const [purpose, setPurpose] = useState(sp.purpose ?? (sp.auto ? "Finalize pricing and rollout plan for 200 seats" : ""));
  const [date, setDate] = useState(sp.date ?? "2026-09-30");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const autoRan = useRef(false);

  const contact = s.contacts.find((c) => c.id === contactId)!;
  const preview = recallMeetingMemory({ contactId, query: `${title} ${purpose}`, limit: 6 });

  const generate = async () => {
    setLoading(true);
    for (let i = 0; i < STEPS.length; i++) { setStep(i); await new Promise((r) => setTimeout(r, 650)); }
    const brief = await reflectOnMeetingContext({ contactId, title: title || "Meeting", date: new Date(date).toISOString(), purpose });
    navigate({ to: "/brief/$briefId", params: { briefId: brief.id } });
  };

  useEffect(() => {
    if (sp.auto && !autoRan.current) { autoRan.current = true; const t = setTimeout(generate, 1200); return () => clearTimeout(t); }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp.auto]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <PageHeader eyebrow="Prepare" title="Prepare for your next meeting" desc="Nexora recalls everything relevant about this contact and writes a personalized brief." />
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          {loading ? (
            <div className="py-10">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand glow"><BrainCircuit className="h-9 w-9 animate-pulse text-primary-foreground" /></div>
              <p className="mt-6 text-center font-display text-lg font-semibold">Generating brief for {contact.name}</p>
              <div className="mx-auto mt-6 max-w-sm space-y-3">
                {STEPS.map((st, i) => (
                  <div key={st} className={`flex items-center gap-3 text-sm transition ${i <= step ? "text-foreground" : "text-muted-foreground/50"}`}>
                    <span className={`grid h-5 w-5 place-items-center rounded-full ${i < step ? "bg-success" : i === step ? "animate-pulse bg-primary" : "bg-muted"}`}>{i < step && <Check className="h-3 w-3 text-background" />}</span>
                    {st}
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-2">{[0, 1, 2].map((i) => <div key={i} className="h-4 animate-shimmer rounded" style={{ width: `${90 - i * 15}%` }} />)}</div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); generate(); }} className="space-y-5">
              <div>
                <label className="text-sm font-medium">Contact</label>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {s.contacts.map((c) => (
                    <button type="button" key={c.id} onClick={() => setContactId(c.id)} className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${c.id === contactId ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"}`}>
                      <Avatar contact={c} size={34} />
                      <div className="min-w-0"><p className="truncate text-sm font-semibold">{c.name}</p><p className="truncate text-xs text-muted-foreground">{c.company}</p></div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="text-sm font-medium">Meeting title</label><input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Pricing discussion" className={inputCls + " mt-2"} /></div>
                <div><label className="text-sm font-medium">Date</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls + " mt-2"} /></div>
              </div>
              <div><label className="text-sm font-medium">Purpose</label><textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} rows={3} placeholder="What do you want to achieve?" className={inputCls + " mt-2"} /></div>
              <button className={btnPrimary + " w-full"}><SparkIcon className="h-4 w-4" /> Generate Meeting Brief</button>
            </form>
          )}
        </Card>
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2"><BrainCircuit className="h-4 w-4 text-primary" /><h2 className="font-display font-semibold">Memory preview</h2></div>
          <p className="mt-1 text-sm text-muted-foreground">What Nexora remembers about {contact.name.split(" ")[0]}</p>
          <div className="mt-4 space-y-2">
            {preview.map((m, i) => (
              <div key={m.id} className="animate-fade-up rounded-xl border border-border bg-secondary/40 p-3" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-center justify-between"><TypeBadge type={m.type} /><Relevance value={m.relevance} /></div>
                <p className="mt-2 text-sm">{m.text}</p>
              </div>
            ))}
            {!preview.length && <p className="text-sm text-muted-foreground">No memories yet for this contact.</p>}
          </div>
        </Card>
      </div>
    </div>
  );
}
