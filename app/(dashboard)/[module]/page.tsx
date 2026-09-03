import { notFound } from "next/navigation";
import { Construction } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const modules: Record<string, { title: string; description: string }> = {
  leads: {
    title: "Leads",
    description: "Capture, assign, and track potential customers.",
  },
  customers: {
    title: "Customers",
    description: "Manage customer profiles, history, and related records.",
  },
  tasks: {
    title: "Tasks",
    description: "Organise work, ownership, priorities, and deadlines.",
  },
  calendar: {
    title: "Calendar",
    description: "See follow-ups, tasks, meetings, and appointments.",
  },
  chat: {
    title: "Team chat",
    description: "Collaborate with team channels and direct messages.",
  },
  reports: {
    title: "Reports",
    description: "Understand leads, conversions, customers, and productivity.",
  },
  settings: {
    title: "Settings",
    description: "Configure the company, system defaults, and branding.",
  },
};

export default async function ModulePlaceholderPage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module: moduleKey } = await params;
  const currentModule = modules[moduleKey];

  if (!currentModule) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-primary">Module</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          {currentModule.title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {currentModule.description}
        </p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="flex min-h-[420px] flex-col items-center justify-center p-8 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Construction className="size-6" aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-lg font-semibold">Module foundation ready</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Navigation and route protection are in place. This module will be
            connected to its database and business workflow in a focused phase.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
