import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 px-4 sm:px-6 md:px-8 lg:px-10">
      <h1 className="text-6xl font-bold text-red-600 mb-4 sm:text-5xl md:text-4xl lg:text-3xl">Oops!</h1>
      <p className="text-xl text-gray-700 mb-2 sm:text-lg md:text-md lg:text-sm">Sorry, an unexpected error has occurred.</p>
      <p className="text-gray-500 sm:text-sm md:text-xs lg:text-xs">
        <i>{(error as any).statusText || (error as any).message}</i>
      </p>
      <Link to='/' className="text-blue-500 hover:underline mt-4">Go to home page</Link>
    </div>
  );
}

export default ErrorPage;
