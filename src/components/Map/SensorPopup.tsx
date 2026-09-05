import { SensorData, HazardZone } from '../../types';

export function renderSensorPopupHtml(sensor: SensorData): string {
  const statusColor =
    sensor.status === 'online'
      ? '#36C98F'
      : sensor.status === 'critical'
      ? '#F05D6B'
      : sensor.status === 'warning'
      ? '#F09A3E'
      : '#6C7A89';

  const statusBg =
    sensor.status === 'online'
      ? 'rgba(54, 201, 143, 0.12)'
      : sensor.status === 'critical'
      ? 'rgba(240, 93, 107, 0.14)'
      : sensor.status === 'warning'
      ? 'rgba(240, 154, 62, 0.14)'
      : 'rgba(255, 255, 255, 0.05)';

  const isWaterAlert = sensor.waterLevel >= 4.50;

  return `
    <div class="rr-sensor-popup" style="font-family: var(--font-sans, 'Geist', sans-serif); padding: 12px 14px; width: 260px; color: #F2F5F7; background: #0D131B; border-radius: 6px; box-shadow: 0 8px 24px rgba(0,0,0,0.5);">
      <!-- Header -->
      <div style="display: flex; align-items: flex-start; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px; margin-bottom: 8px;">
        <div>
          <div class="font-mono" style="font-size: 13px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.01em;">
            ${sensor.code}
          </div>
          <div style="font-size: 11px; color: #8B98A7; margin-top: 1px;">
            ${sensor.location}, ${sensor.state}
          </div>
        </div>
        <span style="font-size: 9.5px; font-weight: 700; padding: 2px 7px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.04em; background: ${statusBg}; color: ${statusColor}; border: 1px solid ${statusColor}40;">
          ${sensor.status}
        </span>
      </div>

      <!-- Telemetry Matrix with IBM Plex Mono -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 8px;">
        <div style="background: rgba(255,255,255,0.03); padding: 6px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.06);">
          <div style="font-size: 9px; color: #8B98A7; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 600;">TEMPERATURE</div>
          <div class="font-mono" style="font-size: 13px; font-weight: 600; color: #FFFFFF; margin-top: 2px;">${sensor.temperature} °C</div>
        </div>

        <div style="background: rgba(255,255,255,0.03); padding: 6px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.06);">
          <div style="font-size: 9px; color: #8B98A7; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 600;">HUMIDITY</div>
          <div class="font-mono" style="font-size: 13px; font-weight: 600; color: #FFFFFF; margin-top: 2px;">${sensor.humidity} %</div>
        </div>

        <div style="background: rgba(255,255,255,0.03); padding: 6px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.06);">
          <div style="font-size: 9px; color: #8B98A7; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 600;">RAINFALL (1H)</div>
          <div class="font-mono" style="font-size: 13px; font-weight: 600; color: #63D7E5; margin-top: 2px;">${sensor.rainfall} mm</div>
        </div>

        <div style="background: ${isWaterAlert ? 'rgba(240, 93, 107, 0.12)' : 'rgba(255,255,255,0.03)'}; padding: 6px 8px; border-radius: 4px; border: 1px solid ${isWaterAlert ? 'rgba(240, 93, 107, 0.35)' : 'rgba(255,255,255,0.06)'};">
          <div style="font-size: 9px; color: ${isWaterAlert ? '#F05D6B' : '#8B98A7'}; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 600;">WATER LEVEL</div>
          <div class="font-mono" style="font-size: 13px; font-weight: 700; color: ${isWaterAlert ? '#F05D6B' : '#FFFFFF'}; margin-top: 2px;">${sensor.waterLevel} m</div>
        </div>
      </div>

      <!-- Secondary Info -->
      <div style="display: flex; align-items: center; justify-content: space-between; font-size: 10px; color: #8B98A7; padding-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 6px;">
        <span>Battery: <strong class="font-mono" style="color: #F2F5F7;">${sensor.battery}%</strong></span>
        <span>Sensor: <strong style="color: #CAD6E2;">${sensor.type.split(' ')[0]}</strong></span>
      </div>

      <!-- Footer -->
      <div style="display: flex; align-items: center; justify-content: space-between; font-size: 9.5px; color: #687586;">
        <span>Sync: <strong class="font-mono" style="color: #8B98A7;">${sensor.lastUpdate}</strong></span>
        <span class="font-mono" style="color: #63D7E5;">${sensor.lat.toFixed(3)}°N, ${sensor.lng.toFixed(3)}°E</span>
      </div>
    </div>
  `;
}

export function renderIncidentPopupHtml(zone: HazardZone): string {
  const isCritical = zone.severity === 'critical';
  const sevColor = isCritical ? '#F05D6B' : zone.severity === 'warning' ? '#F09A3E' : '#F59E0B';
  const sevBg = isCritical ? 'rgba(240, 93, 107, 0.15)' : 'rgba(240, 154, 62, 0.15)';

  return `
    <div class="rr-incident-popup" style="font-family: var(--font-sans, 'Geist', sans-serif); padding: 14px; width: 275px; color: #F2F5F7; background: #0D131B; border-radius: 7px; box-shadow: 0 8px 28px rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.1);">
      <!-- Incident Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
        <span style="font-size: 9.5px; font-weight: 700; padding: 2.5px 7px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em; background: ${sevBg}; color: ${sevColor}; border: 1px solid ${sevColor}40;">
          ${zone.severity.toUpperCase()} · ${zone.type.toUpperCase().replace('_', ' ')}
        </span>
        <span class="font-mono" style="font-size: 10px; color: #63D7E5; font-weight: 600;">
          ${zone.id.toUpperCase()}
        </span>
      </div>

      <div style="font-size: 14px; font-weight: 700; color: #FFFFFF; margin-bottom: 2px;">
        ${zone.location}, ${zone.state}
      </div>
      <div style="font-size: 11px; color: #8B98A7; margin-bottom: 10px;">
        ${zone.title}
      </div>

      <!-- Metrics Matrix -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 10px;">
        <div style="background: rgba(255,255,255,0.03); padding: 6px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.06);">
          <div style="font-size: 9px; color: #8B98A7; text-transform: uppercase; letter-spacing: 0.04em;">AFFECTED AREA</div>
          <div class="font-mono" style="font-size: 13px; font-weight: 700; color: #FFFFFF; margin-top: 2px;">${zone.areaKm2} km²</div>
        </div>
        <div style="background: rgba(255,255,255,0.03); padding: 6px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.06);">
          <div style="font-size: 9px; color: #8B98A7; text-transform: uppercase; letter-spacing: 0.04em;">RISK SCORE</div>
          <div class="font-mono" style="font-size: 13px; font-weight: 700; color: ${sevColor}; margin-top: 2px;">${zone.riskScore}% HIGH</div>
        </div>
      </div>

      <div style="font-size: 10.5px; color: #CAD6E2; line-height: 1.4; padding: 6px 8px; background: rgba(0,0,0,0.3); border-radius: 4px; border-left: 2px solid ${sevColor}; margin-bottom: 8px;">
        ${zone.details}
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; font-size: 9.5px; color: #687586;">
        <span>Status: <strong style="color: #36C98F;">ACTIVE RESPONSE</strong></span>
        <span class="font-mono" style="color: #63D7E5;">${zone.center[0].toFixed(3)}°N, ${zone.center[1].toFixed(3)}°E</span>
      </div>
    </div>
  `;
}
