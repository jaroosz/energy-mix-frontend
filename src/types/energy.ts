export interface EnergySource {
    name: string;
    value: number;
    color: string;
}

export interface EnergySources {
    [key: string]: number;
}

export interface DailyEnergyData {
    date: string;
    sources: EnergySources;
    cleanEnergyPercent: number;
}

export interface EnergyMixResponse {
    days: DailyEnergyData[];
}

export interface ChartSegment extends EnergySource {
    startAngle: number;
    endAngle: number;
    angle: number;
}

export interface OptimalWindow {
    startTime: string;
    endTime: string;
    cleanEnergyPercent: number;
}