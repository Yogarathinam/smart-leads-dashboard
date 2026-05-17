export const escapeCsvValue = (value: string | number | null | undefined) => {
  const stringValue = value == null ? '' : String(value);
  return `"${stringValue.replace(/"/g, '""')}"`;
};