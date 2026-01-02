import { Shield } from "lucide-react";

export function PlanComparisonTable() {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-4 font-semibold">Feature</th>
              <th className="py-4 font-semibold">Basic</th>
              <th className="py-4 font-semibold">Standard</th>
              <th className="py-4 font-semibold">Premium</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-4 font-medium">Monthly Cost</td>
              <td className="py-4">৳99</td>
              <td className="py-4">৳299</td>
              <td className="py-4">৳599</td>
            </tr>
            <tr>
              <td className="py-4 font-medium">GP Access</td>
              <td className="py-4">Limit 2/mo</td>
              <td className="py-4">Unlimited</td>
              <td className="py-4">Unlimited + Priority</td>
            </tr>
            <tr>
              <td className="py-4 font-medium">Specialist Fees</td>
              <td className="py-4">No Coverage</td>
              <td className="py-4">Referral Only</td>
              <td className="py-4">Fully Covered</td>
            </tr>
            <tr>
              <td className="py-4 font-medium">Waiting Period</td>
              <td className="py-4 text-destructive">30 Days</td>
              <td className="py-4 text-destructive">15 Days</td>
              <td className="py-4 text-green-600 font-medium">Instant</td>
            </tr>
            <tr>
              <td className="py-4 font-medium">Network Hospitals</td>
              <td className="py-4 text-muted-foreground">Limited</td>
              <td className="py-4">Major Cities</td>
              <td className="py-4">Nationwide</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
        <p className="text-destructive text-sm flex gap-2 items-start">
          <Shield className="size-4 shrink-0 mt-0.5" />
          <span>
            <strong>Note:</strong> Pre-existing conditions may have a 6-month
            waiting period on Basic and Standard plans. Always read the full
            terms and conditions before subscribing.
          </span>
        </p>
      </div>
    </div>
  );
}