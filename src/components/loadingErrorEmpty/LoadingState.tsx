const CouthaSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="m-3 p-6 rounded-2xl bg-gray-200 animate-pulse"
                >
                    <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
            ))}
        </div>
    );
};

export default CouthaSkeleton;