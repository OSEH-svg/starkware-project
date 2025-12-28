"use client";

import { Check, X } from "lucide-react";

export function ComparisonSection() {
  return (
    <section className="py-24 bg-background w-full flex justify-center border-y border-white/5">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Why Professional Traders Choose Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stop compromising. Get CEX performance with DEX sovereignty.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left text-muted-foreground font-medium">
                  Feature
                </th>
                <th className="p-4 text-center bg-primary/10 rounded-t-lg border-x border-t border-primary/20 text-primary font-bold text-lg">
                  Extended Builder
                </th>
                <th className="p-4 text-center text-muted-foreground opacity-50">
                  Standard AMM
                </th>
                <th className="p-4 text-center text-muted-foreground opacity-50">
                  CEX
                </th>
              </tr>
            </thead>
            <tbody>
              <Row
                feature="Self-Custody"
                builder={true}
                amm={true}
                cex={false}
              />
              <Row
                feature="Gas-Free Orders"
                builder={true}
                amm={false}
                cex={true}
              />
              <Row
                feature="Real-Time Orderbook"
                builder={true}
                amm={false}
                cex={true}
              />
              <Row
                feature="Trading Rewards"
                builder={true}
                amm={true}
                cex={false}
              />
              <Row feature="No KYC" builder={true} amm={true} cex={false} />
              <Row
                feature="Instant Settlement"
                builder={true}
                amm={false}
                cex={true}
              />
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Row({
  feature,
  builder,
  amm,
  cex,
}: {
  feature: string;
  builder: boolean;
  amm: boolean;
  cex: boolean;
}) {
  return (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
      <td className="p-4 font-medium">{feature}</td>
      <td className="p-4 text-center bg-primary/5 border-x border-primary/10">
        {builder ? (
          <Check className="h-6 w-6 text-primary mx-auto" />
        ) : (
          <X className="h-6 w-6 text-muted-foreground/30 mx-auto" />
        )}
      </td>
      <td className="p-4 text-center opacity-50">
        {amm ? (
          <Check className="h-5 w-5 text-white mx-auto" />
        ) : (
          <X className="h-5 w-5 text-white mx-auto" />
        )}
      </td>
      <td className="p-4 text-center opacity-50">
        {cex ? (
          <Check className="h-5 w-5 text-white mx-auto" />
        ) : (
          <X className="h-5 w-5 text-white mx-auto" />
        )}
      </td>
    </tr>
  );
}
