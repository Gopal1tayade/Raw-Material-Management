interface ColorShowProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
}

const ColorShow: React.FC<ColorShowProps> = ({ color }) => {
  return (
    <div className="flex items-center gap-4">
      {color}
      <div
        className="border p-3 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

export { ColorShow };
