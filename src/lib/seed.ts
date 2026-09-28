import type { Contact, Meeting, Memory, MemoryType } from "./types";

export const seedContacts: Contact[] = [
  { id: "rahul", name: "Rahul Sharma", role: "VP Engineering", company: "Acme Tech", email: "rahul@acmetech.io", hue: 250 },
  { id: "priya", name: "Priya Patel", role: "Head of Product", company: "Lumen Health", email: "priya@lumenhealth.com", hue: 300 },
  { id: "arjun", name: "Arjun Mehta", role: "CFO", company: "Northwind Capital", email: "arjun@northwind.vc", hue: 200 },
  { id: "sara", name: "Sara Kim", role: "Procurement Lead", company: "Globex Retail", email: "sara.kim@globex.com", hue: 160 },
  { id: "daniel", name: "Daniel Okafor", role: "CTO", company: "Brightpath Labs", email: "daniel@brightpath.dev", hue: 30 },
];

export const seedMeetings: Meeting[] = [
  { id: "m1", contactId: "rahul", title: "Discovery call — platform fit", date: "2026-07-14T10:00:00Z", purpose: "Understand Acme's integration needs", status: "completed", summary: "Explored Acme's data pipeline and where our API fits. Rahul is interested but cautious about security." },
  { id: "m2", contactId: "rahul", title: "Technical deep-dive", date: "2026-08-19T14:00:00Z", purpose: "Walk through API and SSO", status: "completed", summary: "Reviewed REST API, SSO and audit logs. Agreed to run a 30-day pilot with the data team." },
  { id: "m3", contactId: "rahul", title: "Pilot check-in", date: "2026-09-16T11:00:00Z", purpose: "Review pilot progress", status: "completed", summary: "Pilot is going well; latency concern on bulk sync. Pricing for 200 seats to be proposed." },
  { id: "m4", contactId: "priya", title: "Roadmap alignment", date: "2026-08-05T09:30:00Z", purpose: "Align on Q4 roadmap", status: "completed", summary: "Priya wants patient-facing analytics in Q4 and is worried about HIPAA review timelines." },
  { id: "m5", contactId: "priya", title: "Design review", date: "2026-09-10T15:00:00Z", purpose: "Review dashboard mockups", status: "completed", summary: "Mockups approved with changes to accessibility and mobile layout." },
  { id: "m6", contactId: "arjun", title: "Budget planning", date: "2026-08-27T13:00:00Z", purpose: "FY27 budget review", status: "completed", summary: "Arjun pushed for annual billing and a clear ROI model before committing." },
  { id: "m7", contactId: "sara", title: "Vendor evaluation", date: "2026-09-02T10:00:00Z", purpose: "Procurement requirements", status: "completed", summary: "Sara shared the security questionnaire and a hard deadline for contract signature." },
  { id: "m8", contactId: "daniel", title: "Architecture sync", date: "2026-09-21T16:00:00Z", purpose: "Migration planning", status: "completed", summary: "Discussed migrating from their legacy queue to our event API. Daniel prefers async updates." },
  { id: "u1", contactId: "rahul", title: "Pricing & rollout discussion", date: "2026-09-30T10:00:00Z", purpose: "Finalize pricing and rollout plan for 200 seats", status: "upcoming" },
  { id: "u2", contactId: "priya", title: "Q4 kickoff", date: "2026-10-02T09:30:00Z", purpose: "Kick off analytics build", status: "upcoming" },
  { id: "u3", contactId: "arjun", title: "ROI review", date: "2026-10-05T13:00:00Z", purpose: "Present ROI model", status: "upcoming" },
  { id: "u4", contactId: "sara", title: "Contract review", date: "2026-10-07T11:00:00Z", purpose: "Redlines and signature timeline", status: "upcoming" },
];

let n = 0;
const m = (contactId: string, meetingId: string, type: MemoryType, text: string, topics: string[], status?: "open" | "done"): Memory => {
  const date = seedMeetings.find((x) => x.id === meetingId)!.date;
  return { id: `mem${++n}`, contactId, meetingId, type, text, topics, date, status };
};

export const seedMemories: Memory[] = [
  m("rahul", "m1", "discussion", "Acme ingests ~4M events/day and wants a single integration layer.", ["Integration"]),
  m("rahul", "m1", "concern", "Rahul is worried about data residency and SOC 2 coverage.", ["Security", "Compliance"]),
  m("rahul", "m1", "preference", "Rahul prefers concise, technical briefs with numbers over slides.", ["Communication"]),
  m("rahul", "m1", "commitment", "We promised to send our SOC 2 Type II report.", ["Security"], "done"),
  m("rahul", "m2", "decision", "Agreed to run a 30-day pilot with Acme's data team.", ["Pilot"]),
  m("rahul", "m2", "discussion", "Walked through SSO via Okta and exportable audit logs.", ["Security", "Integration"]),
  m("rahul", "m2", "commitment", "We committed to provide a dedicated Slack support channel during the pilot.", ["Support", "Pilot"], "done"),
  m("rahul", "m3", "concern", "Bulk sync latency spikes above 2s for batches over 50k records.", ["Performance"]),
  m("rahul", "m3", "commitment", "We will share a pricing proposal for 200 seats before the next meeting.", ["Pricing"], "open"),
  m("rahul", "m3", "followup", "Follow up with benchmark results after the bulk sync fix.", ["Performance"], "open"),
  m("rahul", "m3", "discussion", "Rahul mentioned budget approval requires sign-off from their CFO.", ["Budget"]),
  m("priya", "m4", "discussion", "Priya wants patient-facing analytics shipped in Q4.", ["Analytics", "Roadmap"]),
  m("priya", "m4", "concern", "Priya is worried HIPAA review could delay the Q4 launch.", ["Compliance", "Timeline"]),
  m("priya", "m4", "commitment", "We promised to share a HIPAA compliance checklist.", ["Compliance"], "open"),
  m("priya", "m5", "decision", "Dashboard mockups approved with accessibility updates.", ["Design"]),
  m("priya", "m5", "followup", "Send revised mobile layouts by early October.", ["Design"], "open"),
  m("priya", "m5", "preference", "Priya likes visual walkthroughs and short Loom videos.", ["Communication"]),
  m("arjun", "m6", "concern", "Arjun is hesitant without a clear 12-month ROI model.", ["Budget", "ROI"]),
  m("arjun", "m6", "decision", "Annual billing preferred over monthly.", ["Pricing"]),
  m("arjun", "m6", "commitment", "We will prepare an ROI model with three scenarios.", ["ROI"], "open"),
  m("sara", "m7", "discussion", "Globex requires a completed security questionnaire from all vendors.", ["Security", "Procurement"]),
  m("sara", "m7", "concern", "Contract must be signed by Oct 15 to fit the Q4 budget cycle.", ["Contract", "Timeline"]),
  m("sara", "m7", "followup", "Return the completed security questionnaire.", ["Security"], "open"),
  m("daniel", "m8", "discussion", "Migrating from a legacy queue to our event API over two phases.", ["Migration", "Integration"]),
  m("daniel", "m8", "preference", "Daniel prefers async written updates over calls.", ["Communication"]),
  m("daniel", "m8", "commitment", "We will draft a phased migration plan.", ["Migration"], "open"),
];
