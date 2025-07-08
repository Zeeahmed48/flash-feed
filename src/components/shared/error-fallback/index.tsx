import type { FC } from 'react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

const ErrorFallback: FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Error {error.status}</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">Unexpected Error</h1>
      <p className="mt-2">{(error as Error)?.message ?? 'Unknown error'}</p>
    </div>
  );
};

export default ErrorFallback;
