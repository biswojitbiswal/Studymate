"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

/* ---------------- CARD ---------------- */

function WorkflowCard({ id, title, description, color, className }) {
    return (
        <div
            id={id}
            className={clsx(
                "absolute z-10 w-48 rounded-xl bg-white p-3 shadow-md transition-transform hover:scale-105",
                className
            )}
        >
            <p
                className={clsx(
                    "text-sm font-semibold",
                    color === "blue" ? "text-blue-600" : "text-indigo-600"
                )}
            >
                {title}
            </p>
            <p
                className={clsx(
                    "text-[10px]",
                    color === "blue" ? "text-blue-600" : "text-indigo-600"
                )}
            >
                {description}
            </p>

            <div className="mt-2 space-y-1.5">
                <div className={clsx("h-1.5 w-full rounded", color === "blue" ? "bg-blue-50" : "bg-indigo-50")} />
                <div className={clsx("h-1.5 w-2/3 rounded", color === "blue" ? "bg-blue-50" : "bg-indigo-50")} />
            </div>
        </div>
    );
}

/* ---------------- CONNECTION ---------------- */

function Connection({ fromId, toId, containerRef, color, active }) {
    const [path, setPath] = useState("");

    useEffect(() => {
        const updatePath = () => {
            const fromEl = document.getElementById(fromId);
            const toEl = document.getElementById(toId);
            const container = containerRef.current;

            if (!fromEl || !toEl || !container) return;

            const fromRect = fromEl.getBoundingClientRect();
            const toRect = toEl.getBoundingClientRect();
            const contRect = container.getBoundingClientRect();

            const startX = fromRect.left + fromRect.width / 2 - contRect.left;
            const startY = fromRect.top + fromRect.height / 2 - contRect.top;
            const endX = toRect.left + toRect.width / 2 - contRect.left;
            const endY = toRect.top + toRect.height / 2 - contRect.top;

            const midY = startY + (endY - startY) / 2;
            setPath(`M ${startX} ${startY} V ${midY} H ${endX} V ${endY}`);
        };

        updatePath();
        window.addEventListener("resize", updatePath);
        return () => window.removeEventListener("resize", updatePath);
    }, [fromId, toId, containerRef]);

    return (
        <svg className="absolute inset-0 h-full w-full pointer-events-none">
            {/* Base gray line */}
            <path
                d={path}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* Active animated line */}
            {active && (
                <path
                    d={path}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="animate-lighting"
                    style={{
                        strokeDasharray: "200",
                        strokeDashoffset: "200",
                    }}
                />

            )}
        </svg>
    );
}

/* ---------------- MAIN ---------------- */

export default function WorkflowDiagram() {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const connections = [
        { from: "live", to: "mentor", color: "#6366f1" },
        { from: "live", to: "assignment", color: "#3b82f6" },
        { from: "mentor", to: "resources", color: "#6366f1" },
        { from: "mentor", to: "schedule", color: "#6366f1" },
        { from: "assignment", to: "resources", color: "#3b82f6" },
        { from: "resources", to: "attendance", color: "#3b82f6" },
        { from: "schedule", to: "attendance", color: "#6366f1" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((i) => (i + 1) % connections.length);
        }, 1800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col min-h-screen items-center justify-center p-8">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900">
                    One Connected Learning <span className="text-blue-600">Workflow</span>
                </h2>
                <p className="mt-3 max-w-2xl mx-auto text-gray-600">
                    From live classes to group study, resources, and progress tracking —
                    StudyMate connects every part of learning into one seamless system.
                </p>
            </div>
            <div ref={containerRef} className="relative h-[600px] w-full max-w-4xl">
                {/* CONNECTIONS */}
                {connections.map((c, i) => (
                    <Connection
                        key={i}
                        fromId={c.from}
                        toId={c.to}
                        containerRef={containerRef}
                        color={c.color}
                        active={i === activeIndex}
                    />
                ))}

                {/* CARDS */}
                <WorkflowCard id="live" title="Live Class & Tasks" description="Start of learning" color="blue" className="left-10 top-20" />
                <WorkflowCard id="mentor" title="Mentored Group Study" description="Discuss, doubt-solve & collaborate" color="indigo" className="right-20 top-35" />
                <WorkflowCard id="assignment" title="Tasks & Assignments" description="Practice & track learning" color="indigo" className="left-10 top-64" />
                <WorkflowCard
                    id="resources"
                    title="Study Resources"
                    description="Revise & Self-Study"
                    color="blue"
                    className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
                <WorkflowCard
                    id="schedule"
                    title="Smart Scheduling"
                    description="System organizes everything"
                    color="indigo"
                    className="right-10 bottom-35"
                />
                <WorkflowCard
                    id="attendance"
                    title="Attendance & Progress"
                    description="Track attendance & progress"
                    color="blue"
                    className="left-1/2 bottom-10 -translate-x-1/2"
                />
            </div>
        </div>
    );
}
