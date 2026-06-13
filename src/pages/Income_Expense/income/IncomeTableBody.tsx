/* eslint-disable @typescript-eslint/no-explicit-any */

const IncomeTableBody = ({ d, idx }: { d: any, idx: number }) => {
    return (
        <tr key={d._id} className="hover:bg-gray-50">
            <td className="px-4 py-2 border">{idx + 1}</td>
            <td className="px-4 py-2 border">{d?.category}</td>
            <td className="px-4 py-2 border">{d?.createdBy?.name}</td>
            <td className="px-4 py-2 border">{d?.amount}</td>
            <td className="px-4 py-2 border text-center">
                <span>{d.createdAt}</span>

            </td>
            <td className="px-4 py-2 border">{d?.note}</td>
        </tr>
    );
};

export default IncomeTableBody;