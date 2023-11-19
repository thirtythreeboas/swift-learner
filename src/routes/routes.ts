import {createBrowserRouter} from 'react-router-dom';
import React from 'react';
import {Test} from '@/pages/Test/Test';
import {WordList} from '@/pages/WordList';
import {App} from '@/App';
import {ErrorPage} from '@/components/ErrorPage';
import {Home} from '@/pages/Home';
import {RouteNames} from '@/types/const';

const routes = [
  {
    path: RouteNames.ROOT,
    element: React.createElement(App),
    errorElement: React.createElement(ErrorPage),
    children: [
      {index: true, element: React.createElement(Home)},
      {
        path: RouteNames.TEST,
        element: React.createElement(Test),
      },
      {
        path: RouteNames.WORDS,
        element: React.createElement(WordList),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
