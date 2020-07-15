import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Loading } from './style';
import { Spin } from 'antd';
/* 懒加载 */
const Login = lazy(() => import('./pages/login'));
const Admin = lazy(() => import('./pages/admin'));

/* 路由鉴权 */
// wrapper with render Props ( HOC? )
function AuthRoute({children, ...rest}) {
  const isLogin = localStorage.getItem('Token') > Date.now() ? true : false;
  return (
    <Route 
      {...rest}
      render={({location}) => isLogin ? children : <Redirect to={{pathname: "/login", state: {from: location}}}/>}
    />
  )
}

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading> <Spin size="large" /> </Loading>}>
        <Switch>
          <Route path="/login" component={Login}/>
          <AuthRoute path="/">
            <Admin />
          </AuthRoute>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
