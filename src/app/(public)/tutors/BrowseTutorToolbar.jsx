"use client";

import {
    ChevronDown,
    Search,
    SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BrowseTutorToolbar() {
    return (
        <section className="w-full rounded-2xl border bg-white p-4 shadow-sm">

            {/* Mobile Layout */}

            <div className="flex flex-col gap-3 lg:hidden">

                {/* Search */}

                <div className="relative">

                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />

                    <Input
                        placeholder="Search tutors..."
                        className="h-11 pl-11"
                    />

                </div>

                {/* Filters */}

                <div className="grid grid-cols-2 gap-3">

                    <Button
                        variant="outline"
                        className="justify-between h-11"
                    >
                        Subject
                        <ChevronDown size={18} />
                    </Button>

                    <Button
                        variant="outline"
                        className="justify-between h-11"
                    >
                        Level
                        <ChevronDown size={18} />
                    </Button>

                    <Button
                        variant="outline"
                        className="justify-between h-11"
                    >
                        Sort
                        <ChevronDown size={18} />
                    </Button>

                    <Button className="h-11">
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Filters
                    </Button>

                </div>

            </div>

            {/* Desktop Layout */}

            <div className="hidden lg:flex items-center gap-4">

                {/* Search */}

                <div className="relative flex-1">

                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />

                    <Input
                        placeholder="Search tutors by name, subject or keyword..."
                        className="h-12 pl-11"
                    />

                </div>

                {/* Subject */}

                <Button
                    variant="outline"
                    className="h-12 min-w-[150px] justify-between"
                >
                    Subject
                    <ChevronDown size={18} />
                </Button>

                {/* Level */}

                <Button
                    variant="outline"
                    className="h-12 min-w-[140px] justify-between"
                >
                    Level
                    <ChevronDown size={18} />
                </Button>

                {/* Sort */}

                <Button
                    variant="outline"
                    className="h-12 min-w-[190px] justify-between"
                >
                    Sort: Recommended
                    <ChevronDown size={18} />
                </Button>

                {/* Filters */}

                <Button className="h-12 px-6 bg-white text-blue-600 border-2 border-blue-600">

                    <SlidersHorizontal className="mr-2 h-4 w-4" />

                    Filters

                </Button>

            </div>

        </section>
    );
}