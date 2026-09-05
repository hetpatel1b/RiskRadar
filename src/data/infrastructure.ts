import { InfrastructureStats } from '../types';

export const MOCK_INFRASTRUCTURE: InfrastructureStats = {
  totalDevices: 1248,
  online: 1201,
  offline: 47,
  gatewayHealth: 98.7,
  networkHealth: 96.4,
};

export const TOPOLOGY_STEPS = [
  { name: 'SENSORS', count: '1,201 Online', status: 'safe' as const },
  { name: 'GATEWAYS', count: '38 Active', status: 'safe' as const },
  { name: 'NETWORK', count: 'LoRa/4G/Sat', status: 'safe' as const },
  { name: 'RISKRADAR', count: 'Command Core', status: 'ice' as const },
];
