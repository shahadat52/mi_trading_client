import { FaFileExcel } from 'react-icons/fa';

const ButtonExcel = ({ handleExportExcel }: { handleExportExcel: () => void }) => {
    return (
        <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-2 py-1 rounded-lg shadow-md transition-colors"
        >
            <FaFileExcel size={18} />
            Excel
        </button>
    );
};

export default ButtonExcel;