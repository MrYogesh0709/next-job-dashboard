"use client";

import FormSubmitButton from "@/components/FormSubmitButton";
import { Job } from "@prisma/client";
import { useFormState } from "react-dom";
import { approvedSubmission, deleteJob } from "./actions";

interface AdminSidebarProps {
  job: Job;
}

export default function AdminSidebar({ job }: AdminSidebarProps) {
  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
      {job.approved ? (
        <span className="text center font-semibold text-green-500">
          Approved
        </span>
      ) : (
        <ApprovedSubmissionButton jobId={job.id} />
      )}
      <DeleteJobButton jobId={job.id} />
    </aside>
  );
}

interface AdminButtonProps {
  jobId: number;
}

// ! reason of useFormState over onClick normal submit is it works without javascript
// ! we also could use button and onClick function like we did always use useState for error handling and all stuff but this useFormState hook works like does not required javascript
function ApprovedSubmissionButton({ jobId }: AdminButtonProps) {
  //! this is for progressive enhancement and it is like take first as serverFunction and second one is what we get from server action
  //! here in function first argument be prevState
  const [formState, formAction] = useFormState(approvedSubmission, undefined);
  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} readOnly />
      <FormSubmitButton className="w-full bg-green-500 hover:bg-green-600">
        Submit
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}
function DeleteJobButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(deleteJob, undefined);
  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} readOnly />
      <FormSubmitButton className="w-full bg-red-500 hover:bg-red-600">
        Delete
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}
