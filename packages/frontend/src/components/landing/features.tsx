import React from "react";

interface FeatureCardProps {
    title: string;
    description: string;
    accentColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    title,
    description,
    accentColor,
}) => (
    <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
        <div className={`w-12 h-1.5 ${accentColor} rounded-full mb-6`} />
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-black leading-relaxed">{description}</p>
    </div>
);

export const Features: React.FC = () => {
    const features = [
        {
            title: "Zero Setup Fees",
            description:
                "Launch your TipJar completely free. We only charge a small 2% fee when you receive tips.",
            accentColor: "bg-purple-600",
        },
        {
            title: "Instant Withdrawals",
            description:
                "Access your funds immediately with direct blockchain transfers to your wallet.",
            accentColor: "bg-indigo-600",
        },
        {
            title: "Custom Branding",
            description:
                "Personalize colors, messages, and layout to match your unique style.",
            accentColor: "bg-pink-600",
        },
    ];

    return (
        <section className="container mx-auto px-4 py-24">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
                {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </div>
        </section>
    );
};
