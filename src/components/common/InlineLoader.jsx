export function InlineLoader({ size = 16 }) {
  return (
    <div
      className="animate-spin rounded-full border-2 border-blue-600 border-t-transparent"
      style={{ width: size, height: size }}
    />
  );
}
