import React from "react";

interface StatCardProps {
    value: string;
    label: string;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, color }) => (
    <div className="p-6">
        <div className={`text-3xl font-bold ${color} mb-2`}>{value}</div>
        <div className="text-black">{label}</div>
    </div>
);

export const Stats: React.FC = () => {
    const stats = [
        { value: "2.1M+", label: "Tips Received", color: "text-purple-600" },
        { value: "$15M+", label: "Total Volume", color: "text-indigo-600" },
        { value: "98%", label: "Happy Creators", color: "text-pink-600" },
        { value: "24/7", label: "Support", color: "text-blue-600" },
    ];

    return (
        <section className="container mx-auto px-4 py-24">
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>
        </section>
    );
};
