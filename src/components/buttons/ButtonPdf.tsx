import { FaFilePdf } from 'react-icons/fa';

const ButtonPdf = ({ handleExportPDF }: { handleExportPDF: () => void }) => {
    return (
        <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-2 py-1 rounded-lg shadow-md transition-colors"
        >
            <FaFilePdf size={18} />
            PDF
        </button>
    );
};

export default ButtonPdf;