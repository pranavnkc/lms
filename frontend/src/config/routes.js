import React from 'react';
import Loadable from 'react-loadable';

import Home from '../containers/Home';

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('../containers/views/Dashboard'),
  loading: Loading,
});

const Page1 = Loadable({
  loader: () => import('../containers/views/Page1'),
  loading: Loading,
});

const Page2 = Loadable({
  loader: () => import('../containers/views/Page2'),
  loading: Loading,
});
const UserList = Loadable({
  loader: () => import('../containers/views/user/List'),
  loading: Loading,
});

const EditUser = Loadable({
  loader: () => import('../containers/views/user/Edit'),
  loading: Loading,
});

const CreateUser = Loadable({
  loader: () => import('../containers/views/user/Edit'),
  loading: Loading,
});
const Production = Loadable({
  loader: () => import('../containers/views/Production'),
  loading: Loading,
});

const routes = [
    { path: '/', name: '', component: Home, exact: true },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/users/create', name: 'Create User', component: CreateUser },
    { path: '/users/:id', name: 'Edit User', component: EditUser },
    { path: '/users', name: 'User List', component: UserList },
    { path: '/production', name: 'User List', component: Production },
    { path: '/page1', name: 'Page1', component: Page1 },
    { path: '/page2', name: 'Page2', component: Page2 },
];

export default routes;
