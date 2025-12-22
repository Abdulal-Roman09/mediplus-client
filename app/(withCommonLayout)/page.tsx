export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section Placeholder */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-primary mb-6">
          Your Health, Our Priority
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8 text-pretty">
          MediPlus provides world-class healthcare services with experienced doctors and modern technology.
        </p>
        <div className="flex justify-center gap-4">
          <button className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary/90">
            Find a Doctor
          </button>
          <button className="rounded-md border px-6 py-3 text-sm font-semibold hover:bg-accent">Learn More</button>
        </div>
      </div>
    </main>
  )
}
