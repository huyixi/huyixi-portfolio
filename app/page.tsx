import { Header } from "@/components/header";
import { ProjectsGrid } from "@/components/projects-grid";

export default function Home() {
  return (
    <main className="min-h-screen bg-background grid-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header />
        <ProjectsGrid />
      </div>
    </main>
  );
}
