import Image from "next/image";

export default function BrowseTutorHero() {
    return (
        <section className="w-full">

            <div className="mx-auto flex min-h-[240px] flex-col-reverse items-center sm:items-start justify-between gap-8 pt-16 sm:px-2 md:flex-row md:px-8 lg:min-h-[280px]">

                {/* Left */}

                <div className="flex-1 text-left">

                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-5xl">
                        Browse Tutors
                    </h1>

                    <p className="mt-4 max-w-2xl text-lg text-gray-600 lg:text-xl">
                        Find the perfect tutor to help you achieve your goals
                    </p>

                </div>

                {/* Right */}

                <div className="hidden md:flex flex-shrink-0 items-end justify-center md:justify-end">

                    <Image
                        src="/TutorBrowse.png"
                        alt="Browse Tutors"
                        width={260}
                        height={260}
                        priority
                        className="
                            h-auto
                            w-44
                            sm:w-52
                            md:w-60
                            lg:w-72
                            select-none
                            pointer-events-none
                        "
                    />

                </div>

            </div>

        </section>
    );
}