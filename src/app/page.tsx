import dynamic from "next/dynamic";

const TabbedHomepage = dynamic(() => import("@/components/homepage-tabbed/homepage-tabbed"));

export default function HomePage() {
  return <TabbedHomepage />;
}
