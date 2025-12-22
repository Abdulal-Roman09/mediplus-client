import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="container mx-auto px-4">
      <div className="min-h-screen flex justify-between  ">
        {/* Left Side: Text & Buttons */}
        <div className="text-left max-w-lg pt-40">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-primary mb-6">
            Your Health, Our Priority
          </h1>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            MediPlus provides world-class healthcare services with experienced
            doctors and modern technology. We are committed to delivering the
            best care for you and your family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary/90 transition">
              Find a Doctor
            </button>
            <button className="rounded-md border px-6 py-3 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="py-20">
          <Image
            src="https://i.ibb.co.com/d0nzDcx2/a-professional-headshot-photograph-of-a-Krz6fek0-Tg-WH8ojdc-C78-QQ-kqz87-Qd-OSCm-PQ9vc-NXv-Mug.jpg"
            alt="Professional doctor headshot"
            width={500}
            height={600}
            priority
            className="rounded-lg shadow-2xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
