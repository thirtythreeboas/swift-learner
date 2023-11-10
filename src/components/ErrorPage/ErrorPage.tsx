import {FC} from 'react';
import {useRouteError, isRouteErrorResponse} from 'react-router-dom';

export const ErrorPage: FC = () => {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div id='error-page'>
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  }
  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <h2>Something went wrong...</h2>
    </div>
  );
};
