import  React  from 'react';
import { Route, Redirect } from 'react-router-dom'
function ProtectedRoute({ component: Component, ...props }) {
    return (
        <Route>
            {() =>
                props.isLogin ? <Component {...props} /> : <Redirect to='/' />
            }
        </Route>
    )
}

export default ProtectedRoute;