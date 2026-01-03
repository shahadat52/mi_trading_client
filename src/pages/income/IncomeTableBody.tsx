/* eslint-disable @typescript-eslint/no-explicit-any */

const IncomeTableBody = ({ d, idx }: { d: any, idx: number }) => {
    return (
        <tr key={d._id} className="hover:bg-gray-50">
            <td className="px-4 py-2 border">{idx + 1}</td>
            <td className="px-4 py-2 border">{d?.incomeFrom}</td>
            <td className="px-4 py-2 border">{d?.addedBy?.name}</td>
            <td className="px-4 py-2 border">{d?.amount}</td>
            <td className="px-4 py-2 border text-center">
                <span>{new Date(d.date).toLocaleDateString()}</span> <br />
                <span>{new Date(d.date).toLocaleTimeString()}</span>

            </td>
            <td className="px-4 py-2 border">{d?.description}</td>
        </tr>
    );
};

export default IncomeTableBody;