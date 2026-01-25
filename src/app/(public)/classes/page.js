"use client";

import { useEffect, useState } from "react";
import { Heart, Users, Star, Clock, Video, Play, Search, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePublicLanguages } from "@/hooks/admin/useLanguage";
import { usePublicBoards } from "@/hooks/admin/useBoard";
import { usePublicSubjects } from "@/hooks/admin/useSubject";
import { usePublicLevels } from "@/hooks/admin/useLevel";
import { useDebounce } from "@/lib/utils";
import { useBrowseClasses } from "@/hooks/public/useClass";
import { StarRating } from "@/components/common/StarRating";
import { PreviewSkeleton } from "../../../components/skeleton/PreviewSkeleton";
import { ClassCardSkeleton } from "../../../components/skeleton/ClassCardSkeleton";


const SORT_LABEL_MAP = {
    "createdAt-desc": "Latest",
    "price-asc": "Price: Low to High",
    "price-desc": "Price: High to Low",
};


const DEFAULT_SORT = {
    sortBy: "createdAt",
    sortOrder: "desc",
};


const ClassBrowser = () => {
    const [hoveredClass, setHoveredClass] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [priceRange, setPriceRange] = useState(100000);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1)

    const debouncedSearch = useDebounce(search, 500);

    const router = useRouter()


    const { data: subjects = [] } = usePublicSubjects();
    const { data: levels = [] } = usePublicLevels();
    const { data: languages = [] } = usePublicLanguages();
    const { data: boards = [] } = usePublicBoards();

    // Filter options
    const filterOptions = {
        subjects,
        boards,
        languages,
        levels,
        classTypes: ["GROUP", "PRIVATE"],
        ratings: [
            { label: "4.5+ ⭐", value: 4.5 },
            { label: "4.0+ ⭐", value: 4.0 },
            { label: "3.5+ ⭐", value: 3.5 },
            { label: "3.0+ ⭐", value: 3.0 },
        ]

    };

    const browseParams = {
        page,
        limit: 10,
        search: debouncedSearch || undefined,

        subjectIds: selectedFilters.subjectIds?.length
            ? selectedFilters.subjectIds
            : undefined,

        boardIds: selectedFilters.boardIds?.length
            ? selectedFilters.boardIds
            : undefined,

        levelIds: selectedFilters.levelIds?.length
            ? selectedFilters.levelIds
            : undefined,

        languageIds: selectedFilters.languageIds?.length
            ? selectedFilters.languageIds
            : undefined,

        type: selectedFilters.type || undefined,

        paid: selectedFilters.paid ?? undefined,

        maxPrice: selectedFilters.maxPrice ?? undefined,

        minRating: selectedFilters.ratings?.length
            ? Math.min(...selectedFilters.ratings)
            : undefined,

        sortBy: selectedFilters.sortBy || "createdAt",
        sortOrder: selectedFilters.sortOrder || "desc",
    };

    console.log(browseParams);

    const {
        data,
        isLoading,
    } = useBrowseClasses(browseParams);


    const classes = data?.data?.items || [];
    console.log(classes);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, selectedFilters]);



    const toggleWishlist = (id) => {
        setWishlist((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };



    const addFilter = (key, value) => {
        setSelectedFilters((prev) => {
            const current = prev[key] || [];
            if (current.includes(value)) return prev;
            return { ...prev, [key]: [...current, value] };
        });
    };

    const removeFilter = (key, value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [key]: prev[key]?.filter((v) => v !== value),
        }));
    };

    const clearAllFilters = () => {
        setSelectedFilters({ ...DEFAULT_SORT });
        setPage(1);
        setPriceRange(100);
    };

    const applyFilters = () => {
        setPage(1);
        setShowFilters(false);
    };

    const getFilterLabel = (category, value) => {
        switch (category) {
            case "paid":
                return "Free";

            case "maxPrice":
                return `Price ≤ ₹${value.toLocaleString()}`;

            case "subjectIds":
                return subjects.find((s) => s.id === value)?.name;

            case "boardIds":
                return boards.find((b) => b.id === value)?.name;

            case "levelIds":
                return levels.find((l) => l.id === value)?.name;

            case "languageIds":
                return languages.find((l) => l.id === value)?.name;

            case "type":
                return value === "GROUP" ? "Group" : "Private";

            case "ratings":
                return `${value}+ ⭐`;

            case "sortBy": {
                const key = `${selectedFilters.sortBy}-${selectedFilters.sortOrder}`;
                return SORT_LABEL_MAP[key];
            }

            default:
                return value;
        }
    };


    const getActiveFilterCount = () => {
        return Object.entries(selectedFilters).reduce((count, [key, value]) => {
            if (Array.isArray(value)) return count + value.length;

            // ignore default sort
            if (
                (key === "sortBy" && value === DEFAULT_SORT.sortBy) ||
                (key === "sortOrder" && value === DEFAULT_SORT.sortOrder)
            ) {
                return count;
            }

            if (value !== undefined && value !== "") return count + 1;
            return count;
        }, 0);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-26 px-4 sm:px-6 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="hidden lg:block mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Browse Classes
                    </h1>
                    <p className="text-gray-600">
                        Explore and join interactive, mentored study classes
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <div className="flex flex-wrap gap-3">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search classes..."
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Type Dropdown */}
                        <div className="hidden lg:block relative">
                            <select
                                value={selectedFilters.type || ""}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSelectedFilters(prev => ({
                                        ...prev,
                                        type: value || undefined,
                                    }));
                                }}
                                className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer font-medium"
                            >
                                <option value="">All Types</option>
                                <option value="GROUP">Group</option>
                                <option value="PRIVATE">Private</option>
                            </select>

                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>


                        {/* Sort Dropdown */}
                        <div className="hidden lg:block relative">
                            <select
                                value={`${selectedFilters.sortBy || "createdAt"}-${selectedFilters.sortOrder || "desc"}`}
                                onChange={(e) => {
                                    const [sortBy, sortOrder] = e.target.value.split("-");
                                    setSelectedFilters(prev => ({
                                        ...prev,
                                        sortBy,
                                        sortOrder,
                                    }));
                                }}
                                className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer font-medium"
                            >
                                <option value="createdAt-desc">Sort by Latest</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>

                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>


                        {/* All Filters Button */}
                        {/* Filter Button */}
                        <button
                            onClick={() => setShowFilters(true)}
                            className="flex items-center justify-center px-3 py-2.5
                 border-2 border-blue-600 text-blue-600 rounded-lg
                 hover:bg-blue-50 transition-colors"
                            aria-label="Open filters"
                        >
                            <SlidersHorizontal className="w-5 h-5" />

                            {/* Text only on desktop */}
                            <span className="hidden lg:inline ml-2 font-semibold">
                                All Filters
                            </span>

                            {getActiveFilterCount() > 0 && (
                                <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                                    {getActiveFilterCount()}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Selected Filters Chips */}
                {/* Active Filter Chips */}
                {getActiveFilterCount() > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex flex-wrap gap-2">
                        <span className="text-sm font-medium text-gray-700">
                            Active Filters:
                        </span>

                        {Object.entries(selectedFilters).map(([category, value]) => {
                            if (category === "sortOrder") return null;

                            // skip default sort
                            if (
                                category === "sortBy" &&
                                value === DEFAULT_SORT.sortBy &&
                                selectedFilters.sortOrder === DEFAULT_SORT.sortOrder
                            ) {
                                return null;
                            }

                            // Array filters
                            if (Array.isArray(value)) {
                                return value.map((v) => (
                                    <Chip
                                        key={`${category}-${v}`}
                                        label={getFilterLabel(category, v)}
                                        onRemove={() => removeFilter(category, v)}
                                    />
                                ));
                            }

                            // Single value filters (price, free, type, sort)
                            if (value !== null && value !== undefined) {
                                return (
                                    <Chip
                                        key={category}
                                        label={getFilterLabel(category, value)}
                                        onRemove={() => {
                                            setSelectedFilters((prev) => {
                                                if (category === "paid") {
                                                    return { ...prev, paid: undefined };
                                                }

                                                if (category === "maxPrice") {
                                                    return { ...prev, maxPrice: null };
                                                }

                                                if (category === "sortBy") {
                                                    return { ...prev, ...DEFAULT_SORT };
                                                }

                                                return { ...prev, [category]: undefined };
                                            });
                                        }}
                                    />
                                );
                            }

                            return null;
                        })}

                        <button
                            onClick={clearAllFilters}
                            className="ml-auto text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-sm hover:cursor-pointer"
                        >
                            Clear All
                        </button>
                    </div>
                )}



                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Class Cards */}
                    <div className="w-full lg:flex-1 space-y-4">
                        {isLoading
                            ? Array.from({ length: 6 }).map((_, i) => (
                                <ClassCardSkeleton key={i} />
                            ))
                            : classes.map((classItem) => (
                                <div
                                    key={classItem.id}
                                    onMouseEnter={() => setHoveredClass(classItem)}
                                    className="bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-300 p-4 cursor-pointer border border-gray-200"
                                >
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {/* Thumbnail */}
                                        <div className="relative shrink-0 w-full sm:w-48 h-44 bg-amber-500 rounded-md overflow-hidden">
                                            <Image
                                                src={classItem?.previewImg || "/logo.png"}
                                                alt={classItem.title}
                                                fill
                                                className="object-cover"
                                                sizes="192px"
                                            />

                                        </div>

                                        {/* Class Details */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                        {classItem.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <span className="text-blue-600 font-medium">
                                                            {classItem.subject.name}
                                                        </span>
                                                        <span>•</span>
                                                        <span>{classItem.level.name}</span>
                                                        <span>•</span>
                                                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded font-semibold">
                                                            {classItem.type}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => toggleWishlist(classItem.id)}
                                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                                >
                                                    <Heart
                                                        className={`w-5 h-5 ${wishlist.includes(classItem.id)
                                                            ? "fill-red-500 text-red-500"
                                                            : "text-gray-400"
                                                            }`}
                                                    />
                                                </button>
                                            </div>

                                            {/* Tutor Info */}
                                            <div className="flex items-center gap-3 mb-3">
                                                <img
                                                    src={classItem.tutor.user.avatar}
                                                    alt={classItem.tutor.user.name}
                                                    className="w-10 h-10 rounded-full border-2 border-blue-600"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-gray-900">
                                                            {classItem.tutor.user.name}
                                                        </span>
                                                        <StarRating rating={classItem.tutor.rating} size={14} />


                                                    </div>
                                                    <div className="flex items-center gap-3 text-xs text-gray-600">
                                                        <span className="flex items-center gap-1">
                                                            <Users className="w-3 h-3" />
                                                            {classItem.tutor.totalStudents} students
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {classItem.tutor.yearsOfExp} experience
                                                        </span>
                                                        {/* <span>{classItem.tutor.sessions} sessions</span> */}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-auto pt-3 border-t border-gray-100">

                                                {/* Left: stats */}
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <Users className="w-4 h-4" />
                                                        {classItem.tutor.totalStudents} students
                                                    </span>
                                                    <span>{classItem?.reviews || 45} reviews</span>
                                                </div>

                                                {/* Right: price + CTA */}
                                                <div className="flex items-center justify-between sm:justify-end gap-3">
                                                    <div className="text-left sm:text-right">
                                                        <div className="text-xl sm:text-2xl font-bold text-gray-900">
                                                            ₹{classItem?.price.toFixed(2)}
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => router.push(`/classes/${classItem.id}`)}
                                                        className="
        w-full sm:w-auto
        px-4 sm:px-6
        py-2.5
        bg-blue-600 hover:bg-blue-700
        text-white font-semibold
        rounded-lg transition-colors
      "
                                                    >
                                                        Buy Now
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* Fixed Video Preview */}
                    {isLoading ? <PreviewSkeleton /> : <div className="hidden lg:block w-80 shrink-0">
                        <div className="sticky top-6 bg-white rounded-xl shadow-lg p-4">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                                Class Preview
                            </h3>
                            {hoveredClass ? (
                                <div>
                                    <div className="relative mb-3 w-full h-48 rounded-lg overflow-hidden">
                                        {hoveredClass?.previewVdo ? (
                                            <video
                                                src={hoveredClass.previewVdo}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <img
                                                src={hoveredClass?.previewImg || "/logo.png"}
                                                alt={hoveredClass?.title}
                                                className="w-full h-full object-cover"
                                            />
                                        )}

                                        {/* Play Overlay (optional) */}
                                        <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                                                <Play className="w-8 h-8 text-blue-600 ml-1" />
                                            </div>
                                        </button>
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2">
                                        {hoveredClass?.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mb-3">
                                        <img
                                            src={hoveredClass?.tutor?.user?.avatar}
                                            alt={hoveredClass.tutor.user?.name}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {hoveredClass.tutor.user.name}
                                            </div>
                                            <div className="text-sm">
                                                <StarRating rating={hoveredClass.tutor?.rating} size={12} />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            <span>{hoveredClass.tutor.totalStudents} students enrolled</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Video className="w-4 h-4" />
                                            <span>{hoveredClass.type}</span>
                                        </div>
                                    </div>
                                    <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                                        Watch Preview
                                    </button>
                                    <button className="w-full mt-2 py-2.5 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-colors">
                                        + Follow
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                                    <Video className="w-16 h-16 mb-3" />
                                    <p className="text-center">
                                        Hover over a class to see preview
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>}
                </div>


                {data?.data?.totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">

                        {/* Prev */}
                        <button
                            disabled={page <= 1}
                            onClick={() =>
                                setPage((p) => Math.max(1, Number(p) - 1))
                            }
                            className="px-3 py-1.5 border rounded-md text-sm disabled:opacity-50"
                        >
                            Prev
                        </button>


                        {/* Page numbers */}
                        {Array.from({ length: data?.data?.totalPages }).map((_, idx) => {
                            const pageNumber = idx + 1;

                            // optional: show only nearby pages
                            if (
                                pageNumber !== 1 &&
                                pageNumber !== data?.data?.totalPages &&
                                Math.abs(pageNumber - page) > 1
                            ) {
                                return null;
                            }

                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => setPage(pageNumber)}
                                    className={`
            px-3 py-1.5 rounded-md text-sm
            ${page === pageNumber
                                            ? "bg-blue-600 text-white"
                                            : "border hover:bg-gray-100"}
          `}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}

                        {/* Next */}
                        <button
                            disabled={!data?.data?.totalPages || page >= data?.data?.totalPages}
                            onClick={() => {
                                if (!data?.data?.totalPages) return;

                                setPage((p) => {
                                    const current = Number(p) || 1;
                                    return Math.min(data?.data?.totalPages, current + 1);
                                });
                            }}
                            className="px-3 py-1.5 border rounded-md text-sm disabled:opacity-50"
                        >
                            Next
                        </button>

                    </div>
                )}

            </div>


            {showFilters && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setShowFilters(false)}
                    />

                    {/* Sidebar */}
                    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-xl font-bold text-gray-900">All Filters</h2>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">

                            {/* Subjects */}
                            <FilterBlock title="Subjects">
                                {filterOptions.subjects.map((subject) => (
                                    <Checkbox
                                        key={subject.id}
                                        checked={selectedFilters.subjectIds?.includes(subject.id) || false}
                                        onChange={(checked) =>
                                            checked
                                                ? addFilter("subjectIds", subject.id)
                                                : removeFilter("subjectIds", subject.id)
                                        }
                                        label={subject.name}
                                    />
                                ))}
                            </FilterBlock>

                            {/* Boards */}
                            <FilterBlock title="Boards">
                                {filterOptions.boards.map((board) => (
                                    <Checkbox
                                        key={board.id}
                                        checked={selectedFilters.boardIds?.includes(board.id) || false}
                                        onChange={(checked) =>
                                            checked
                                                ? addFilter("boardIds", board.id)
                                                : removeFilter("boardIds", board.id)
                                        }
                                        label={board.name}
                                    />
                                ))}
                            </FilterBlock>

                            {/* Levels */}
                            <FilterBlock title="Level / Grade">
                                {filterOptions.levels.map((level) => (
                                    <Checkbox
                                        key={level.id}
                                        checked={selectedFilters.levelIds?.includes(level.id) || false}
                                        onChange={(checked) =>
                                            checked
                                                ? addFilter("levelIds", level.id)
                                                : removeFilter("levelIds", level.id)
                                        }
                                        label={level.name}
                                    />
                                ))}
                            </FilterBlock>

                            {/* Languages */}
                            <FilterBlock title="Languages">
                                {filterOptions.languages.map((language) => (
                                    <Checkbox
                                        key={language.id}
                                        checked={selectedFilters.languageIds?.includes(language.id) || false}
                                        onChange={(checked) =>
                                            checked
                                                ? addFilter("languageIds", language.id)
                                                : removeFilter("languageIds", language.id)
                                        }
                                        label={language.name}
                                    />
                                ))}
                            </FilterBlock>

                            {/* Class Type (SINGLE VALUE) */}
                            <FilterBlock title="Class Type">
                                {filterOptions.classTypes.map((type) => (
                                    <Checkbox
                                        key={type}
                                        checked={selectedFilters.type === type}
                                        onChange={(checked) =>
                                            setSelectedFilters((prev) => ({
                                                ...prev,
                                                type: checked ? type : undefined,
                                            }))
                                        }
                                        label={type === "GROUP" ? "Group" : "Private"}
                                    />
                                ))}
                            </FilterBlock>

                            {/* Price */}
                            <FilterBlock title="Price Range">
                                <input
                                    type="range"
                                    min="0"
                                    max="100000"
                                    value={priceRange}
                                    disabled={selectedFilters.paid === false} // ✅ disable when free
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        setPriceRange(value);

                                        setSelectedFilters((prev) => ({
                                            ...prev,
                                            maxPrice: value,
                                            paid: undefined, // ❗ selecting price clears "free"
                                        }));
                                    }}
                                    className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                />

                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>₹0</span>
                                    <span>₹{priceRange}</span>
                                </div>

                                <Checkbox
                                    checked={selectedFilters.paid === false}
                                    onChange={(checked) => {
                                        setSelectedFilters((prev) => ({
                                            ...prev,
                                            paid: checked ? false : undefined,
                                            maxPrice: checked ? null : prev.maxPrice, // ✅ clear price
                                        }));
                                    }}
                                    label="Show Free Classes"
                                />
                            </FilterBlock>



                            {/* Ratings */}
                            <FilterBlock title="Tutor Rating">
                                {filterOptions.ratings.map((rating) => (
                                    <Checkbox
                                        key={rating.value}
                                        checked={selectedFilters.ratings?.includes(rating.value) || false}
                                        onChange={(checked) =>
                                            checked
                                                ? addFilter("ratings", rating.value)
                                                : removeFilter("ratings", rating.value)
                                        }
                                        label={rating.label}
                                    />
                                ))}
                            </FilterBlock>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t bg-gray-50 flex gap-3">
                            <button
                                onClick={clearAllFilters}
                                className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-semibold"
                            >
                                Clear All
                            </button>
                            <button
                                onClick={applyFilters}
                                className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </>
            )}


        </div>
    );
};


const Chip = ({ label, onRemove }) => (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
        <span>{label}</span>
        <button onClick={onRemove}>
            <X className="w-3.5 h-3.5" />
        </button>
    </div>
);

const FilterBlock = ({ title, children }) => (
    <div>
        <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
        <div className="space-y-2">{children}</div>
    </div>
);

const Checkbox = ({ checked, onChange, label }) => (
    <label className="flex items-center gap-2 cursor-pointer">
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-gray-700">{label}</span>
    </label>
);


export default ClassBrowser;