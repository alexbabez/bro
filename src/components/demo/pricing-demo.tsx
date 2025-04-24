import { useState } from "react";
import { PricingCards } from "@/components/ui/pricing-cards";
import { ContactDialog } from "@/components/ui/contact-dialog";

function PricingDemo() {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleContactSales = () => {
        setDialogOpen(true);
    };

    const tiers = [
        {
            name: "SELF",
            price: 299,
            description: "For small teams and growing businesses",
            highlight: true,
            features: [
                { name: "Up to 20 team members", included: true },
                { name: "Advanced analytics", included: true },
                { name: "24/7 email support", included: true },
                { name: "API access", included: true, highlight: true },
                { name: "Custom integrations", included: false },
                { name: "Enterprise features", included: false },
            ],
            cta: {
                text: "Contact Sales",
                onClick: handleContactSales,
            },
        },
        {
            name: "TEAM",
            price: 999,
            interval: "monthly",
            description: "For large organizations and enterprises",
            highlight: true,
            features: [
                { name: "Unlimited team members", included: true },
                { name: "Advanced analytics", included: true },
                { name: "24/7 priority support", included: true },
                { name: "Unlimited API access", included: true, highlight: true },
                { name: "Custom integrations", included: true },
                { name: "Enterprise features", included: true },
            ],
            cta: {
                text: "Contact Sales",
                onClick: handleContactSales,
            }
        },
    ];

    return (
        <div className="relative w-full mx-auto">
            {/* Contact dialog */}
            <ContactDialog open={dialogOpen} onOpenChange={setDialogOpen} />
            
            {/* Background blur effects */}
            <div className="absolute top-1/3 left-1/4 w-[70%] h-[60%] bg-primary/30 rounded-full filter blur-3xl opacity-20 z-0"></div>
            <div className="absolute bottom-1/3 right-1/4 w-[60%] h-[50%] bg-primary/20 rounded-full filter blur-3xl opacity-10 z-0"></div>
            
            {/* Pricing cards with transparent background */}
            <PricingCards 
                tiers={tiers}
                className="gap-8 text-center"
                containerClassName="py-4 relative z-10 w-full"
                sectionClassName="bg-transparent w-full px-0"
                cardClassName="backdrop-blur-sm bg-background/50 dark:bg-background/50 border-primary/20"
            />
        </div>
    );
}

export { PricingDemo } 