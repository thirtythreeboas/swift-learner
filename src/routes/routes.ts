import {createBrowserRouter} from 'react-router-dom';
import React from 'react';
import {Test} from '@/pages/Test/Test';
import {Dictionary} from '@/pages/Dictionary';
import {App} from '@/App';
import {ErrorPage} from '@/components/ErrorPage';
import {Home} from '@/pages/Home';
import {RouteNames} from '@/const';

const routes = [
  {
    path: RouteNames.ROOT,
    element: React.createElement(App),
    errorElement: React.createElement(ErrorPage),
    children: [
      {index: true, element: React.createElement(Home)},
      {
        path: `${RouteNames.TEST}/:wordBlock`,
        element: React.createElement(Test),
      },
      {
        path: `${RouteNames.WORDS}/:wordBlock`,
        element: React.createElement(Dictionary),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
