import { Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

function FAQ() {
  return (
    <div className="w-full py-12 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="flex gap-6 flex-col">
            <div className="flex gap-3 flex-col">
              <div>
                <Badge variant="outline">FAQ</Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h4 className="text-2xl md:text-3xl tracking-tighter max-w-xl text-left font-medium">
                  Frequently Asked Questions
                </h4>
                <p className="text-base max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                  Navigating the crypto world is challenging, especially with the rise of memecoins and potential scams. 
                  Trinexscan helps you make informed decisions by providing comprehensive analysis.
                </p>
              </div>
              <div>
                <Button className="gap-2" variant="outline" size="sm" onClick={() => window.open('https://discord.gg/trinexscan', '_blank')}>
                  Contact support <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm md:text-base font-medium">
                  What is Trinexscan?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Trinexscan is a platform to help crypto investors analyze and verify token legitimacy, 
                  especially memecoins. We scan smart contracts, detect potential rug pulls, and provide 
                  real-time alerts for suspicious activities.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm md:text-base font-medium">
                  How does the token verification work?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Our verification system uses a proprietary scoring algorithm that analyzes 
                  contract code, liquidity patterns, developer wallet activities, and other metrics 
                  to determine legitimacy and risk level.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-sm md:text-base font-medium">
                  Can Trinexscan detect all types of scams?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  While our tools catch most common scam patterns, the crypto space is constantly evolving. 
                  We update our algorithms regularly, but always recommend doing your own research as well.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-sm md:text-base font-medium">
                  What blockchains do you support?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Currently, we support Ethereum, Binance Smart Chain, Polygon, Solana, and Avalanche. 
                  We're adding more blockchain networks based on user demand.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-sm md:text-base font-medium">
                  How accurate are your rug pull predictions?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Our rug pull detection has a high accuracy rate based on historical data. 
                  However, no prediction system is 100% foolproof in the volatile crypto market.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-sm md:text-base font-medium">
                  Is there a mobile app available?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Currently, Trinexscan is available as a web app optimized for both desktop and 
                  mobile browsers. Native mobile apps will be released soon.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger className="text-sm md:text-base font-medium">
                  How often is the market data updated?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Market data is updated in real-time for premium users. Free tier users receive 
                  updates with a slight delay of approximately 5 minutes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8">
                <AccordionTrigger className="text-sm md:text-base font-medium">
                  Do you offer refunds?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Yes, we offer a 7-day money-back guarantee for all new premium subscriptions. 
                  Please contact our support team for assistance with refunds.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export { FAQ };
