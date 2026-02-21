import {
    ArrowDownRight01Icon,
    ArrowUpRight01Icon,
    MinusSignIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Marquee } from "@/components/ui/marquee";
import { Skeleton } from "@/components/ui/skeleton";
import { useExchangeRates } from "@/hooks/use-exchange-rates";

function formatNumber(num: number): string {
    return num.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
}

function RateItem({
    symbol,
    bid,
    ask,
}: {
    symbol: string;
    bid: number;
    ask: number;
    currency: string;
}) {
    const diff = ask - bid;
    const isUp = diff > 0;
    const isDown = diff < 0;
    const spread = Math.abs(diff).toFixed(2);

    return (
        <div className="flex items-center gap-3 px-4 py-1">
            <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                {symbol}
            </span>
            <span className="font-mono text-sm tabular-nums text-foreground">
                {formatNumber(bid)}
            </span>
            <span className="text-muted-foreground font-mono text-xs">KHR</span>
            <span className="flex items-center gap-0.5">
                {isUp && (
                    <HugeiconsIcon
                        icon={ArrowUpRight01Icon}
                        size={12}
                        color="currentColor"
                        className="text-green-500"
                    />
                )}
                {isDown && (
                    <HugeiconsIcon
                        icon={ArrowDownRight01Icon}
                        size={12}
                        color="currentColor"
                        className="text-red-500"
                    />
                )}
                {!isUp && !isDown && (
                    <HugeiconsIcon
                        icon={MinusSignIcon}
                        size={12}
                        color="currentColor"
                        className="text-muted-foreground"
                    />
                )}
                <span className="font-mono text-[10px] text-muted-foreground">
                    {spread}
                </span>
            </span>
        </div>
    );
}

export function ExchangeRateMarquee() {
    const { rates, isLoading } = useExchangeRates();

    if (isLoading) {
        return (
            <div className="bg-card border-b border-border py-2">
                <Skeleton className="h-5 w-full" />
            </div>
        );
    }

    if (!rates || rates.length === 0) {
        return null;
    }

    const separator = (
        <span className="text-border font-mono px-2 select-none">│</span>
    );

    return (
        <div className="bg-card border-b border-border py-2">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono whitespace-nowrap">
                        Rates
                    </span>
                    <Marquee speed={30} className="flex-1">
                        <div className="flex items-center">
                            {rates.map((rate, index) => (
                                <div
                                    key={rate.currency_id}
                                    className="flex items-center"
                                >
                                    <RateItem
                                        symbol={rate.currency_id}
                                        bid={rate.bid}
                                        ask={rate.ask}
                                        currency={rate.currency}
                                    />
                                    {index < rates.length - 1 && separator}
                                </div>
                            ))}
                            {separator}
                        </div>
                    </Marquee>
                </div>
            </div>
        </div>
    );
}
