import Image from "next/image";

export default function BrowseTutorHero() {
    return (
        <section className="w-full">

            <div className="mx-auto flex min-h-[120px] flex-col-reverse items-start sm:items-start justify-between gap-8 pt-12 md:flex-row lg:min-h-[220px] mt-10 ">

                {/* Left */}

                <div className="flex-1 text-left px-1 pt-2 lg:pt-6">

                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-5xl">
                        Browse Tutors
                    </h1>

                    <p className="lg:mt-4 max-w-2xl text-lg text-gray-600 lg:text-xl">
                        Find the perfect tutor to help you achieve your goals
                    </p>

                </div>

                {/* Right */}

                <div className="hidden md:flex flex-shrink-0">

                    <Image
                        src="/TutorBrowse.png"
                        alt="Browse Tutors"
                        width={200}
                        height={220}
                        priority
                        className="
                            h-auto
                            w-44
                            sm:w-52
                            md:w-60
                            lg:w-66
                            select-none
                            pointer-events-none
                        "
                    />

                </div>

            </div>

        </section>
    );
}