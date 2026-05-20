type StatusBadgeProps = {
  label: string;
  status: string;
};

export function StatusBadge({ label, status }: StatusBadgeProps) {
  return <span className={`status-badge status-${status}`}>{label}</span>;
}
