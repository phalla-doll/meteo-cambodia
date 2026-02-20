export interface WeatherCondition {
    text: string;
    icon: string;
    code: number;
}

export interface WeatherData {
    id: number;
    name: string;
    temp_c: number;
    temp_f: number;
    feelslike_c: number;
    feelslike_f: number;
    humidity: number;
    wind_kph: number;
    wind_mph: number;
    wind_dir: string;
    wind_degree: number;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    cloud: number;
    vis_km: number;
    vis_miles: number;
    uv: number | null;
    gust_kph: number;
    gust_mph: number;
    dewpoint_c: number;
    dewpoint_f: number;
    heatindex_c: number;
    heatindex_f: number;
    windchill_c: number;
    windchill_f: number;
    is_day: boolean;
    condition: WeatherCondition;
    last_updated: string;
    last_updated_epoch: number;
    created_at: string;
}

export interface WeatherResponse {
    data: WeatherData;
}

export interface AllWeatherResponse {
    data: WeatherData[];
}
