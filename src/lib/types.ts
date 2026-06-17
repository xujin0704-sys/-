export type AssetLevel = 'S核心' | 'A重要' | 'B一般';
export type SecurityLevel = 'L1-公开' | 'L2-内部' | 'L3-保密' | 'L4-绝密';

export interface AssetTags {
  business: string[];
  data: string[];
  capability: string[];
}

export interface DataAsset {
  id: string;
  name: string;
  catalog?: string;
  assetLevel: AssetLevel;
  securityLevel: SecurityLevel;
  owner: string;
  tags: AssetTags;
  description: string;
  healthScore: number;
  updateFrequency: string;
  dataVolume?: string;
}

export interface MetricData {
  time: string;
  qps: number;
  errors: number;
}

export interface BusinessDomainMap {
  id: string;
  name: string;
  description: string;
  revenueStatus: string;
  coreMetrics: { label: string; value: string }[];
  assetsUsed: string[]; // IDs of dependent assets
}
