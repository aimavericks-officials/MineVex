export interface SiteAsset {
  id: string;
  title: string;
  category: 'hero' | 'logo' | 'diagram' | 'team' | 'general';
  imageUrl: string;
  uploadedBy: string;
  updatedAt: string;
  fileSize?: number;
  dimensions?: string;
}

export interface AccidentDataPoint {
  year: number;
  fatalAccidents: number;
  notes?: string;
}

export interface MineVehicle {
  id: string;
  name: string;
  type: string;
  speedKmH: number;
  distanceM: number;
  status: 'SAFE' | 'WARNING' | 'CRITICAL';
  x: number;
  y: number;
  heading: number;
  driverId: string;
  payloadTons: number;
}

export interface ResearchPaper {
  id: string;
  stageNumber?: number;
  stageName: string;
  title: string;
  description: string;
  paperTitle: string;
  year: number;
  journal: string;
  doi?: string;
  url?: string;
  secondaryUrl?: string;
  secondaryUrlLabel?: string;
  iconType: 'camera' | 'sensor' | 'collision' | 'trajectory' | 'map' | 'motion' | 'simulation' | 'book';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  skills: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  researchUrl?: string;
  email?: string;
  order: number;
}

export interface SimulationTelemetry {
  visibilityMeters: number;
  recommendedSpeedKmH: number;
  minSafeDistanceMeters: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  conditionText: string;
  detectionMode: string;
  systemLatencyMs: number;
  activeVehicles: number;
  riskEventsCount: number;
  alertsIssuedCount: number;
}

// Legacy compatibility interfaces
export interface MonitoredZone {
  id: string;
  name: string;
  district: string;
  lat: number;
  lng: number;
  baseRiskScore: number;
  currentRiskScore: number;
  waterLevelMeters: number;
  dangerLevelMeters: number;
  trend: 'rising' | 'falling' | 'stable';
  inundationAreaSqKm: number;
  evacuationStatus: 'Normal' | 'Advisory' | 'Warning' | 'Mandatory Evacuation';
  populationAtRisk: number;
  embankmentIntegrity: number;
}

export interface LiveEventLog {
  id: string;
  timestamp: string;
  timeAgo: string;
  zone: string;
  type: 'CRITICAL' | 'WARNING' | 'INFO' | 'SUCCESS';
  message: string;
  source: string;
}

export interface TelemetryData {
  waterLevelCm: number;
  waterLevelStatus: 'SAFE' | 'WARNING' | 'DANGER';
  rainfallMmH: number;
  flowRateLMin: number;
  reservoirPercent: number;
  isOnline: boolean;
  uptime: string;
  signalDbm: number;
  gate1Status: 'OPEN' | 'CLOSED' | 'PARTIAL';
  gate2Status: 'OPEN' | 'CLOSED' | 'PARTIAL';
  relayActive: boolean;
  motorRunning: boolean;
  buzzerActive: boolean;
  temperatureC: number;
  humidityPercent: number;
  manualOverrideActive: boolean;
}

export interface ArduinoComponent {
  id: string;
  name: string;
  codeName: string;
  role: string;
  status: 'ACTIVE' | 'STANDBY' | 'TRANSMITTING';
  value: string;
  pin: string;
  description: string;
  voltage: string;
  sampleSnippet: string;
  color: string;
}

export interface ResearchSource {
  id: string;
  name: string;
  fullName: string;
  badge: string;
  description: string;
  dataFeed: string;
  updateFrequency: string;
  resolution: string;
  iconName: string;
}

export interface TechnologyItem {
  id: string;
  title: string;
  category: 'AI & ML' | 'Geospatial' | 'IoT Telemetry' | 'Early Warning';
  description: string;
  techStack: string;
  metric: string;
  iconName: string;
}
