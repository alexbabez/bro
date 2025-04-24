import { Hero } from "@/components/ui/hero";
import { StarBorder } from "@/components/ui/star-border";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

function HeroDemo() {
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const stepContent = [
    {
      title: "alex is best ",
      description:
        "Discover a powerful solution designed to enhance your workflow.",
    },
    {
      title: "Customizable Features",
      description:
        "Each feature is fully customizable and built with modern standards in mind.",
    },
    {
      title: "Ready to Start?",
      description: "Begin using our platform to transform your experience.",
    },
    {
      title: "Get Support",
      description:
        "Access our documentation and community resources to make the most of our solution.",
    },
  ];

  const totalSteps = stepContent.length;

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  return (
    <div className="h-full w-full">
      <Hero
        title="Tools That Made For You."
        subtitle="Scan memecoin legitimacy and detect potential rug pulls — all in one platform. No need to switch between multiple tools."
        customActions={
          <Dialog
            onOpenChange={(open) => {
              if (open) {
                setStep(1);
                setShowSuccess(false);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button size="lg" className="rounded-lg px-6 font-medium bg-white hover:bg-gray-100 text-black">
                <div className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className={cn(
              "gap-0 p-0 [&>button:last-child]:text-white max-h-[90vh] overflow-hidden",
              showSuccess ? "sm:max-w-[550px] md:max-w-[580px] rounded-xl" : ""
            )}>
              {!showSuccess ? (
                <>
                  <div className="p-2">
                    <div className="w-full h-[260px] rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                      <span className="text-5xl font-bold">AI Product</span>
                    </div>
                  </div>
                  <div className="space-y-6 px-6 pb-6 pt-3">
                    <DialogHeader>
                      <DialogTitle>{stepContent[step - 1].title}</DialogTitle>
                      <DialogDescription>{stepContent[step - 1].description}</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div className="flex justify-center space-x-1.5 max-sm:order-1">
                        {[...Array(totalSteps)].map((_, index) => (
                          <div
                            key={index}
                            className={`h-1.5 w-1.5 rounded-full bg-primary ${
                              index + 1 === step ? "bg-primary" : "opacity-20"
                            }`}
                          />
                        ))}
                      </div>
                      <DialogFooter>
                        {step < totalSteps ? (
                          <Button className="group" type="button" onClick={handleContinue}>
                            Next
                            <ArrowRight
                              className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          </Button>
                        ) : (
                          <Button 
                            type="button" 
                            onClick={() => setShowSuccess(true)}
                          >
                            Get Started
                          </Button>
                        )}
                      </DialogFooter>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-7 px-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-background to-blue-500/5" />
                  <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full blur-[80px] bg-purple-500/10" />
                  <div className="absolute bottom-0 left-0 w-[150px] h-[150px] rounded-full blur-[80px] bg-blue-500/10" />
                  <DialogHeader className="mb-6 space-y-2 relative z-10">
                    <DialogTitle className="text-2xl">Success!</DialogTitle>
                    <DialogDescription className="text-base opacity-80">
                      Thank you for your interest. You've successfully completed the onboarding process.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-center">
                    <DialogClose asChild>
                      <Button>Close</Button>
                    </DialogClose>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        }
        titleClassName="font-heading text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mt-10"
        subtitleClassName="text-lg md:text-xl text-gray-300 max-w-[600px] mt-4 font-normal"
        actionsClassName="mt-8 relative z-[60]" 
        className="h-full" 
      />
    </div>
  );
}

export { HeroDemo };
