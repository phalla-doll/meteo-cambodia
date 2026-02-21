import { Wind } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAqi } from "@/hooks/use-aqi";
import { getAqiInfo } from "@/types/aqi";

function PollutantBadge({
    label,
    value,
    unit,
}: {
    label: string;
    value: number;
    unit: string;
}) {
    return (
        <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
                {label}
            </span>
            <span className="font-mono text-xs tabular-nums text-foreground">
                {value.toFixed(2)}
            </span>
            <span className="text-[10px] text-muted-foreground">{unit}</span>
        </div>
    );
}

interface AirQualityCardProps {
    province: string | null;
}

export function AirQualityCard({ province }: AirQualityCardProps) {
    const { aqi, isLoading, isError } = useAqi(province);

    if (!province) return null;

    if (isLoading) {
        return (
            <div className="bg-card border-b border-border h-[64px]">
                <div className="container mx-auto px-4 h-full flex items-center">
                    <div className="flex items-center justify-between gap-4 flex-wrap w-full">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <Skeleton className="w-4 h-4 rounded-full" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-12" />
                                <Skeleton className="h-5 w-6" />
                                <Skeleton className="h-3 w-12" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 flex-wrap">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !aqi) {
        return (
            <div className="bg-card border-b border-border h-[64px]">
                <div className="container mx-auto px-4 h-full flex items-center">
                    <p className="text-xs font-mono text-muted-foreground">
                        AQI data unavailable for {province}
                    </p>
                </div>
            </div>
        );
    }

    const aqiInfo = getAqiInfo(aqi.us_epa_index);

    return (
        <div className="bg-card border-b border-border h-[64px]">
            <div
                className={`container mx-auto px-4 h-full flex items-center ${aqiInfo.bgColor}`}
            >
                <div className="flex items-center justify-between gap-4 flex-wrap w-full">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Wind className="w-4 h-4 text-muted-foreground" />
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                                Air Quality
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span
                                className={`inline-flex items-center px-2 py-0.5 text-xs font-mono font-semibold uppercase tracking-wider ${aqiInfo.textColor}`}
                            >
                                {aqiInfo.level}
                            </span>
                            <span className="font-mono text-lg tabular-nums text-foreground">
                                {aqi.us_epa_index}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                                EPA Index
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                        <PollutantBadge
                            label="PM2.5"
                            value={aqi.pm2_5}
                            unit="μg/m³"
                        />
                        <PollutantBadge
                            label="PM10"
                            value={aqi.pm10}
                            unit="μg/m³"
                        />
                        <PollutantBadge
                            label="O₃"
                            value={aqi.o3}
                            unit="μg/m³"
                        />
                        <PollutantBadge
                            label="CO"
                            value={aqi.co}
                            unit="μg/m³"
                        />
                        <PollutantBadge
                            label="NO₂"
                            value={aqi.no2}
                            unit="μg/m³"
                        />
                        <PollutantBadge
                            label="SO₂"
                            value={aqi.so2}
                            unit="μg/m³"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
