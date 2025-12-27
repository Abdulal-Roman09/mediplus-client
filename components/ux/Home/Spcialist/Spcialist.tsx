import { Specialty } from "@/interface/spilaties";
import Image from "next/image";

export default async function Specialist() {
  let specialties: Specialty[] = [];

  try {
    const res = await fetch("http://localhost:5000/api/v1/specialties", {
      next: { revalidate: 60 },
    });

    const result = await res.json();
    specialties = result?.data || [];
  } catch (error) {
    console.error("Failed to fetch specialties:", error);
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Explore Treatment Specialties
        </h1>
        <p className="text-lg text-muted-foreground">
          Find expert doctors in various medical specialties
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {specialties.length > 0 ? (
          specialties.map((specialty: Specialty) => (
            <div
              key={specialty.id}
              className="group cursor-pointer rounded-xl border bg-card p-6 text-center shadow hover:shadow-xl transition-shadow"
            >
              <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition">
                {specialty.file ? (
                  <Image
                    src={specialty.file}
                    alt={`${specialty.title} icon`}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                ) : (
                  <div className="text-muted-foreground text-xs">No Icon</div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {specialty.title}
              </h3>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            No specialties found.
          </div>
        )}
      </div>
    </section>
  );
}
