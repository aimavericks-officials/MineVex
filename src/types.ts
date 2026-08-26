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
  embankmentIntegrity: number; // percentage
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
