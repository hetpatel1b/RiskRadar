import type { InfrastructureStatus } from '../types/infrastructure';

export const mockInfrastructureStatus: InfrastructureStatus = {
  totalDevices: 1248,
  onlineDevices: 1201,
  offlineDevices: 16,
  degradedDevices: 31,
  overallHealthPercent: 96.4,
  gatewayHealthPercent: 97.7,
  networkHealth: {
    latencyMs: 38,
    packetLossPercent: 0.14,
    bandwidthKbps: 480,
    activeGatewaysCount: 42,
    totalGatewaysCount: 43,
    protocol: 'LoRaWAN 915MHz'
  },
  topology: {
    sensorsCount: 1201,
    gatewaysCount: 42,
    relayNetworksCount: 6,
    commandCenterStatus: 'CONNECTED'
  }
};
