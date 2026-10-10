/**
 * Automation Savings Calculator defaults. Pure client-side estimate.
 * DUMMY: replace before launch (review assumptions with real project data)
 */
export const calculator = {
  /** Share of manual task time a typical automation removes. Conservative on purpose. */
  automationRate: 0.7, // DUMMY: replace before launch
  weeksPerMonth: 4.33,
  hours: { min: 1, max: 80, default: 15, step: 1 },
  hourlyCost: { min: 100, max: 3000, default: 400, step: 50 }, // ₹ per hour of staff time
  people: { min: 1, max: 25, default: 2, step: 1 },
  /** Typical tasks shown as quick presets (hours / week per person). */
  presets: [
    { label: "Lead follow-ups", hours: 6 },
    { label: "WhatsApp replies", hours: 10 },
    { label: "Data entry & sheets", hours: 5 },
    { label: "Invoices & reminders", hours: 3 },
    { label: "Reporting", hours: 4 },
  ],
  disclaimer:
    "Estimates assume automation removes about 70% of the time spent on the tasks you entered. Your real savings depend on your processes, and we'll confirm them in a free audit.",
};
