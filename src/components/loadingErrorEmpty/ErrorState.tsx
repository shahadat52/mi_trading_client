type Props = {
    message?: string;
    onRetry?: () => void;
};

const ErrorState = ({ message = "Something went wrong!", onRetry }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-red-500">
            <p>{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Retry
                </button>
            )}
        </div>
    );
};

export default ErrorState;