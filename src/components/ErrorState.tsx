const ErrorState = ({ message }: { message: string }) => {
  return (
    <div className="text-center text-red-500 py-4">
      Error: {message}
    </div>
  );
};
export default ErrorState;
