interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Search posts..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded"
    />
  );
}
