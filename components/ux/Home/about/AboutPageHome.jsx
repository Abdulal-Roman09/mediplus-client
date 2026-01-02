import StatsCounter from "./StatsCounter";
import WhatWeOfferPage from "./WhatWeOfferPage";

export default function AboutPageHome() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-16">
      <StatsCounter />
      <WhatWeOfferPage />
    </div>
  );
}
