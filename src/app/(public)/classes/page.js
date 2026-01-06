"use client";

import { useState } from "react";
import { Heart, Users, Star, Clock, Video, Play, Search, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ClassBrowser = () => {
    const [hoveredClass, setHoveredClass] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({});

    const router = useRouter()

    // Filter options
    const filterOptions = {
        subjects: ["Mathematics", "Science", "Physics", "Chemistry", "Biology", "English", "History", "Geography"],
        boards: ["CBSE", "ICSE", "State Board", "IB", "IGCSE"],
        languages: ["English", "Hindi", "Tamil", "Telugu", "Bengali"],
        grades: ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"],
        levels: ["Beginner", "Intermediate", "Advanced"],
        classTypes: ["Live Session", "Course", "Group Study", "1-on-1", "Doubt Session"],
        ratings: ["4.5+ ⭐", "4.0+ ⭐", "3.5+ ⭐", "3.0+ ⭐"],
    };

    const classes = [
        {
            id: 1,
            title: "Algebra Fundamentals",
            subject: "Mathematics",
            level: "11th Grade",
            type: "Live Session",
            price: 12,
            tutor: {
                name: "Mr. Anil Kumar",
                image: "/Hero.png",
                rating: 4.8,
                students: 80,
                experience: "8+",
                sessions: 38,
            },
            preview: "/Hero.png",
            duration: "1:21",
            students: 80,
            reviews: 120,
        },
        {
            id: 2,
            title: "Atoms & Molecules Basics",
            subject: "Biology",
            level: "Biology Level",
            type: "Group Study",
            price: 10,
            tutor: {
                name: "Mrs. Sharma",
                image: "/Hero.png",
                rating: 4.2,
                students: 110,
                experience: "5+",
                sessions: 35,
            },
            preview: "/Hero.png",
            duration: "1:45",
            students: 110,
            reviews: 95,
            badge: "POPULAR",
        },
        {
            id: 3,
            title: "Web Development Bootcamp",
            subject: "Coding Course",
            level: "Level",
            type: "Course",
            price: 20,
            tutor: {
                name: "Sarah Lee",
                image: "/Hero.png",
                rating: 4.9,
                students: 110,
                experience: "6+",
                sessions: 29,
            },
            preview: "/Hero.png",
            duration: "2:15",
            students: 110,
            reviews: 200,
            badge: "POPULAR",
        },
        {
            id: 4,
            title: "Spoken English Club",
            subject: "English",
            level: "Level",
            type: "Live Session",
            price: 15,
            tutor: {
                name: "Julie Roy",
                image: "/Hero.png",
                rating: 4.6,
                students: 95,
                experience: "10+",
                sessions: 42,
            },
            preview: "/Hero.png",
            duration: "1:30",
            students: 95,
            reviews: 150,
            badge: "LIVE",
        },
        {
            id: 5,
            title: "Algebra Fundamentals",
            subject: "Mathematics",
            level: "11th Grade",
            type: "Live Session",
            price: 12,
            tutor: {
                name: "Mr. Anil Kumar",
                image: "/Hero.png",
                rating: 4.8,
                students: 80,
                experience: "8+",
                sessions: 38,
            },
            preview: "/Hero.png",
            duration: "1:21",
            students: 80,
            reviews: 120,
        },
        {
            id: 6,
            title: "Algebra Fundamentals",
            subject: "Mathematics",
            level: "11th Grade",
            type: "Live Session",
            price: 12,
            tutor: {
                name: "Mr. Anil Kumar",
                image: "/Hero.png",
                rating: 4.8,
                students: 80,
                experience: "8+",
                sessions: 38,
            },
            preview: "/Hero.png",
            duration: "1:21",
            students: 80,
            reviews: 120,
        },
        {
            id: 7,
            title: "Algebra Fundamentals",
            subject: "Mathematics",
            level: "11th Grade",
            type: "Live Session",
            price: 12,
            tutor: {
                name: "Mr. Anil Kumar",
                image: "/Hero.png",
                rating: 4.8,
                students: 80,
                experience: "8+",
                sessions: 38,
            },
            preview: "/Hero.png",
            duration: "1:21",
            students: 80,
            reviews: 120,
        },
    ];

    const toggleWishlist = (id) => {
        setWishlist((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };


    const addFilter = (category, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [category]: [...(prev[category] || []), value]
        }));
    };

    const removeFilter = (category, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [category]: prev[category].filter(v => v !== value)
        }));
    };

    const clearAllFilters = () => {
        setSelectedFilters({});
    };

    const applyFilters = () => {
        setShowFilters(false);
        // API call would go here
    };

    const getActiveFilterCount = () => {
        return Object.values(selectedFilters).flat().length;
    };


    return (
        <div className="min-h-screen bg-gray-50 py-30 px-24">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Browse Classes
                    </h1>
                    <p className="text-gray-600">
                        Explore and join interactive, mentored study classes.
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <div className="flex flex-wrap gap-3">
                        {/* Search */}
                        <div className="flex-1 min-w-[280px] relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search classes..."
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Type Dropdown */}
                        <div className="relative">
                            <select className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer font-medium">
                                <option>All Types</option>
                                <option>Live Session</option>
                                <option>Course</option>
                                <option>Group Study</option>
                                <option>1-on-1</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <select className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer font-medium">
                                <option>Sort by Latest</option>
                                <option>Most Popular</option>
                                <option>Highest Rated</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>

                        {/* All Filters Button */}
                        <button
                            onClick={() => setShowFilters(true)}
                            className="flex items-center gap-2 px-4 py-2.5 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                        >
                            <SlidersHorizontal className="w-5 h-5" />
                            All Filters
                            {getActiveFilterCount() > 0 && (
                                <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                                    {getActiveFilterCount()}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Selected Filters Chips */}
                {getActiveFilterCount() > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">Active Filters:</span>
                            {Object.entries(selectedFilters).map(([category, values]) =>
                                values.map((value) => (
                                    <div
                                        key={`${category}-${value}`}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                                    >
                                        <span>{value}</span>
                                        <button
                                            onClick={() => removeFilter(category, value)}
                                            className="hover:bg-blue-100 rounded-full p-0.5"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))
                            )}
                            <button
                                onClick={clearAllFilters}
                                className="ml-auto text-sm text-gray-600 hover:text-gray-900 font-medium"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex gap-6">
                    {/* Class Cards */}
                    <div className="flex-1 space-y-4">
                        {classes.map((classItem) => (
                            <div
                                key={classItem.id}
                                onMouseEnter={() => setHoveredClass(classItem)}
                                className="bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-300 p-4 cursor-pointer border border-gray-200"
                            >
                                <div className="flex gap-4">
                                    {/* Thumbnail */}
                                    <div className="relative shrink-0">
                                        <Image
                                            src={classItem.preview}
                                            alt={classItem.title}
                                            width={192}   // w-48 = 192px
                                            height={128}  // h-32 = 128px
                                            className="object-cover rounded-lg"
                                        />
                                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                            {classItem.duration}
                                        </div>
                                        {classItem.badge && (
                                            <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded font-semibold">
                                                {classItem.badge}
                                            </div>
                                        )}
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
                                                        {classItem.subject}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{classItem.level}</span>
                                                    <span>•</span>
                                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded">
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
                                                src={classItem.tutor.image}
                                                alt={classItem.tutor.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-gray-900">
                                                        {classItem.tutor.name}
                                                    </span>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {classItem.tutor.rating}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <Users className="w-3 h-3" />
                                                        {classItem.tutor.students} students
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {classItem.tutor.experience} experience
                                                    </span>
                                                    <span>{classItem.tutor.sessions} sessions</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-4 h-4" />
                                                    {classItem.students} students
                                                </span>
                                                <span>{classItem.reviews} reviews</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-gray-900">
                                                        ${classItem.price}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        per session
                                                    </div>
                                                </div>
                                                <button onClick={() => router.push(`/classes/${classItem.id}`)} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
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
                    <div className="w-80 flex-shrink-0">
                        <div className="sticky top-6 bg-white rounded-xl shadow-lg p-4">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                                Class Preview
                            </h3>
                            {hoveredClass ? (
                                <div>
                                    <div className="relative mb-3">
                                        <img
                                            src={hoveredClass.preview}
                                            alt={hoveredClass.title}
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                        <button className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors rounded-lg">
                                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                                                <Play className="w-8 h-8 text-blue-600 ml-1" />
                                            </div>
                                        </button>
                                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
                                            {hoveredClass.duration}
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2">
                                        {hoveredClass.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mb-3">
                                        <img
                                            src={hoveredClass.tutor.image}
                                            alt={hoveredClass.tutor.name}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {hoveredClass.tutor.name}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-gray-600">
                                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                <span>{hoveredClass.tutor.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            <span>{hoveredClass.students} students enrolled</span>
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
                    </div>
                </div>
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
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* Subjects */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Subjects</h3>
                                <div className="space-y-2">
                                    {filterOptions.subjects.map((subject) => (
                                        <label key={subject} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedFilters.subjects?.includes(subject) || false}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        addFilter('subjects', subject);
                                                    } else {
                                                        removeFilter('subjects', subject);
                                                    }
                                                }}
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-gray-700">{subject}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Boards */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Boards</h3>
                                <div className="space-y-2">
                                    {filterOptions.boards.map((board) => (
                                        <label key={board} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedFilters.boards?.includes(board) || false}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        addFilter('boards', board);
                                                    } else {
                                                        removeFilter('boards', board);
                                                    }
                                                }}
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-gray-700">{board}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Grades */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Grade/Level</h3>
                                <div className="space-y-2">
                                    {filterOptions.grades.map((grade) => (
                                        <label key={grade} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedFilters.grades?.includes(grade) || false}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        addFilter('grades', grade);
                                                    } else {
                                                        removeFilter('grades', grade);
                                                    }
                                                }}
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-gray-700">{grade}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Languages */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Languages</h3>
                                <div className="space-y-2">
                                    {filterOptions.languages.map((language) => (
                                        <label key={language} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedFilters.languages?.includes(language) || false}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        addFilter('languages', language);
                                                    } else {
                                                        removeFilter('languages', language);
                                                    }
                                                }}
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-gray-700">{language}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Class Types */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Class Type</h3>
                                <div className="space-y-2">
                                    {filterOptions.classTypes.map((type) => (
                                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedFilters.classTypes?.includes(type) || false}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        addFilter('classTypes', type);
                                                    } else {
                                                        removeFilter('classTypes', type);
                                                    }
                                                }}
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-gray-700">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                                <div className="space-y-4">
                                    <div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            className="w-full"
                                        />
                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <span>₹0</span>
                                            <span>₹100+</span>
                                        </div>
                                    </div>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                        />
                                        <span className="text-gray-700">Show Free Classes</span>
                                    </label>
                                </div>
                            </div>

                            {/* Ratings */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Tutor Rating</h3>
                                <div className="space-y-2">
                                    {filterOptions.ratings.map((rating) => (
                                        <label key={rating} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedFilters.ratings?.includes(rating) || false}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        addFilter('ratings', rating);
                                                    } else {
                                                        removeFilter('ratings', rating);
                                                    }
                                                }}
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-gray-700">{rating}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 border-t bg-gray-50 flex gap-3">
                            <button
                                onClick={clearAllFilters}
                                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Clear All
                            </button>
                            <button
                                onClick={applyFilters}
                                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
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

export default ClassBrowser;