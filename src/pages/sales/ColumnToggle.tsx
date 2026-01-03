interface Props {
    columns: string[];
    visible: string[];
    onChange: (cols: string[]) => void;
}

const ColumnToggle: React.FC<Props> = ({ columns, visible, onChange }) => {
    const toggle = (col: string) => {
        onChange(
            visible.includes(col)
                ? visible.filter(c => c !== col)
                : [...visible, col]
        );
    };

    return (
        <div className="flex flex-wrap gap-2">
            {columns.map(col => (
                <label key={col} className="flex items-center gap-1 text-xs">
                    <input
                        type="checkbox"
                        checked={visible.includes(col)}
                        onChange={() => toggle(col)}
                    />
                    {col}
                </label>
            ))}
        </div>
    );
};

export default ColumnToggle;
