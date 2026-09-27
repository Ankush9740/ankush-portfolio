import { PortfolioShell } from "@/components/portfolio-shell";

export default function Home() {
  const year = new Date().getUTCFullYear();
  return <PortfolioShell year={year} />;
}
