import { SensorData } from '../../types';

export function renderSensorPopupHtml(sensor: SensorData): string {
  const statusColor =
    sensor.status === 'online'
      ? 'var(--semantic-safe)'
      : sensor.status === 'critical'
      ? 'var(--semantic-critical)'
      : sensor.status === 'warning'
      ? 'var(--semantic-warning)'
      : 'var(--text-muted)';

  const statusBg =
    sensor.status === 'online'
      ? 'var(--semantic-safe-bg)'
      : sensor.status === 'critical'
      ? 'var(--semantic-critical-bg)'
      : sensor.status === 'warning'
      ? 'var(--semantic-warning-bg)'
      : 'rgba(255, 255, 255, 0.05)';

  return `
    <div class="rr-sensor-popup" style="font-family: var(--font-sans); padding: 12px 14px; width: 250px; color: var(--text-primary); background: var(--surface-elevated);">
      <!-- Header -->
      <div style="display: flex; align-items: flex-start; justify-content: space-between; border-bottom: 1px solid var(--border-obsidian); padding-bottom: 8px; margin-bottom: 8px;">
        <div>
          <div class="font-mono" style="font-size: 13px; font-weight: 600; color: #ffffff; letter-spacing: -0.01em;">
            ${sensor.code}
          </div>
          <div style="font-size: 11px; color: var(--text-secondary); margin-top: 1px;">
            ${sensor.location}, ${sensor.state}
          </div>
        </div>
        <span style="font-size: 9.5px; font-weight: 600; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; background: ${statusBg}; color: ${statusColor}; border: 1px solid ${statusColor}40;">
          ${sensor.status}
        </span>
      </div>

      <!-- Telemetry Matrix with IBM Plex Mono -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 8px;">
        <div style="background: var(--surface-secondary); padding: 5px 8px; border-radius: 4px; border: 1px solid var(--border-obsidian);">
          <div style="font-size: 9px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.03em;">Temperature</div>
          <div class="font-mono" style="font-size: 12px; font-weight: 600; color: #ffffff; margin-top: 1px;">${sensor.temperature} °C</div>
        </div>

        <div style="background: var(--surface-secondary); padding: 5px 8px; border-radius: 4px; border: 1px solid var(--border-obsidian);">
          <div style="font-size: 9px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.03em;">Humidity</div>
          <div class="font-mono" style="font-size: 12px; font-weight: 600; color: #ffffff; margin-top: 1px;">${sensor.humidity} %</div>
        </div>

        <div style="background: var(--surface-secondary); padding: 5px 8px; border-radius: 4px; border: 1px solid var(--border-obsidian);">
          <div style="font-size: 9px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.03em;">Rainfall (1h)</div>
          <div class="font-mono" style="font-size: 12px; font-weight: 600; color: #ffffff; margin-top: 1px;">${sensor.rainfall} mm</div>
        </div>

        <div style="background: var(--surface-secondary); padding: 5px 8px; border-radius: 4px; border: 1px solid var(--border-obsidian);">
          <div style="font-size: 9px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.03em;">Water Level</div>
          <div class="font-mono" style="font-size: 12px; font-weight: 600; color: #ffffff; margin-top: 1px;">${sensor.waterLevel} m</div>
        </div>
      </div>

      <!-- Secondary Info -->
      <div style="display: flex; align-items: center; justify-content: space-between; font-size: 10px; color: var(--text-muted); padding-bottom: 6px; border-bottom: 1px solid var(--border-obsidian); margin-bottom: 6px;">
        <span>Battery: <strong class="font-mono" style="color: var(--text-primary);">${sensor.battery}%</strong></span>
        <span>Sensor: <strong style="color: var(--text-secondary);">${sensor.type.split(' ')[0]}</strong></span>
      </div>

      <!-- Footer -->
      <div style="display: flex; align-items: center; justify-content: space-between; font-size: 9px; color: var(--text-muted);">
        <span>Sync: <strong class="font-mono" style="color: var(--text-secondary);">${sensor.lastUpdate}</strong></span>
        <span class="font-mono" style="color: var(--signal-cyan);">${sensor.lat.toFixed(3)}, ${sensor.lng.toFixed(3)}</span>
      </div>
    </div>
  `;
}
