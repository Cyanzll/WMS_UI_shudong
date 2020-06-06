import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Loading } from './style';
import { Spin } from 'antd';
/* 懒加载 */
const Login = lazy(() => import('./pages/login'));
const Admin = lazy(() => import('./pages/admin'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading><Spin size="large" /></Loading>}>
        <Switch>
          <Route path="/admin" component={Admin}/>
          <Route path="/login" component={Login}/>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
