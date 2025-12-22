



const TableSkeleton = ({ row }: { row: number }) => (

    <div className="p-4 animate-pulse" >

        {
            [...Array(row | 10)].map((_, idx) => (
                <div key={idx} className="h-8 bg-gray-300 rounded animate-pulse mb-2" />
            ))
        }

    </div >
);

export default TableSkeleton;
