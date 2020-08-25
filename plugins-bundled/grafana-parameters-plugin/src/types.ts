import { DataQuery } from '@grafana/data';

type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
}

export interface MrsFormModel {
  name: string;
  description: string;
  type: string;
  unit: string;
  tags: {};
  classes: string;
  is_virtual: boolean;
  query: string;
  expression: string;
  simulate: boolean;
  simulation: Simulation;
  limits: Limits;
}

interface Limits {
  sanity: Sanity;
  permissible: Permissible;
}

interface Sanity {
  min: string;
  max: string;
  action: string;
}

interface Permissible {
  min: string;
  max: string;
}

interface Simulation {
  bucket: string;
  historical: string;
  forecast: string;
  features: string;
  data: SData;
}

interface SData {
  distribution: string;
  mean: string;
  conf: string;
  delta: string;
  trend: Trend;
  seasonality: Seasonality;
}

interface Trend {
  multiplicative: boolean;
  expression: string;
}

interface Seasonality {
  multiplicative: boolean;
  periods: string;
  expression: string;
  distribution: string;
}
