import React from 'react';
import {Test} from '@/pages/Test/Test';
import {ShowWords} from '@/components/ShowWords';
import {Home} from '@/pages/Home/Home';

type Route = {
  path: string;
  component: React.ComponentType;
};

export enum RouteNames {
  HOME = '/',
  LOGIN = '/login',
  WORDS = '/words',
  TEST = '/test',
}

export const routes: Route[] = [
  {
    path: RouteNames.WORDS,
    component: Test,
  },
  {
    path: RouteNames.WORDS,
    component: ShowWords,
  },
  {
    path: RouteNames.HOME,
    component: Home,
  },
];
