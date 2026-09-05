export interface GatewayNode {
  id: string;
  name: string;
  sector: string;
  connectedSensors: number;
  status: 'online' | 'degraded' | 'offline';
  uptimePercentage: number;
  signalStrength: number; // dBm
}

export interface NetworkHealthMetric {
  latencyMs: number;
  packetLossPercent: number;
  bandwidthKbps: number;
  activeGatewaysCount: number;
  totalGatewaysCount: number;
  protocol: 'LoRaWAN 915MHz' | 'Satellite L-Band Uplink' | 'Cellular 5G-IoT';
}

export interface InfrastructureStatus {
  totalDevices: number;
  onlineDevices: number;
  offlineDevices: number;
  degradedDevices: number;
  overallHealthPercent: number;
  gatewayHealthPercent: number;
  networkHealth: NetworkHealthMetric;
  topology: {
    sensorsCount: number;
    gatewaysCount: number;
    relayNetworksCount: number;
    commandCenterStatus: 'CONNECTED' | 'SYNCHRONIZING' | 'DEGRADED';
  };
}
