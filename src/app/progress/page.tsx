import { PageHeader } from "@/components/layout/PageHeader";
import { ProgressDashboard } from "@/components/progress/ProgressDashboard";

export const metadata = {
  title: "Progress | Physical AI Lab",
};

export default function ProgressPage() {
  return (
    <>
      <PageHeader
        eyebrow="Progress"
        title="Where you stand."
        description="Modules passed, daily streak, all-time accuracy. Locked modules need their prerequisite exam passed at 95% before unlocking."
      />
      <ProgressDashboard />
    </>
  );
}
