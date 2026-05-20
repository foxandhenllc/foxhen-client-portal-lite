type PublicSafeToggleProps = {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
};

export function PublicSafeToggle({ enabled, onChange }: PublicSafeToggleProps) {
  return (
    <label className="mode-toggle">
      <span>
        <strong>Public-safe mode</strong>
        <small>{enabled ? "Fixture-only exports" : "Private fork preview"}</small>
      </span>
      <input type="checkbox" checked={enabled} onChange={(event) => onChange(event.target.checked)} />
    </label>
  );
}
