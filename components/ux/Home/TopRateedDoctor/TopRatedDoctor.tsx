import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Doctor } from "@/interface/doctor";

export default async function TopRatedDoctors() {
  const res = await fetch(
    "http://localhost:5000/api/v1/doctor?page=1&limit=4",
    {
      cache: "no-store",
    }
  );
  const { data: doctors } = await res.json();

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-10">
        Top Rated Doctors
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {doctors.map((doctor: Doctor) => (
          <Card
            key={doctor.id}
            className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            {/* Profile Photo as Card Image */}
            <div className="relative h-60 ">
              {doctor.profilePhoto ? (
                <Image
                  src={doctor.profilePhoto}
                  alt="hlw"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Avatar className="h-32 w-32">
                    <AvatarFallback className="text-4xl">
                      {doctor.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>

            <CardHeader className="text-center pb-3">
              <CardTitle className="text-xl">{doctor.name}</CardTitle>
              <CardDescription className="text-base font-medium ">
                {doctor.qualification}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 text-center">
              <p className="text-sm text-muted-foreground">
                {doctor.designation} at {doctor.currentWorkingPlace}
              </p>
            </CardContent>

            <CardFooter className="pt-4">
              <Button className="w-full" size="lg">
                Book Appointment
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
