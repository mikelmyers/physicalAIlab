import { PracticeRunner } from "@/components/practice/PracticeRunner";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata = {
  title: "Daily Practice | Physical AI Lab",
};

export default function PracticePage() {
  return (
    <>
      <PageHeader
        eyebrow="Daily Practice"
        title="10 mixed questions a day."
        description="The set is weighted toward concepts you've missed most often, drawn only from modules you've unlocked. Same day, same questions — different days, different questions."
      />
      <PracticeRunner />
    </>
  );
}
