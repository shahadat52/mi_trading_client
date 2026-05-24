type Props = {
    message?: string;
};

const EmptyState = ({ message = "No data found" }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <p className="text-lg">{message}</p>
        </div>
    );
};

export default EmptyState;