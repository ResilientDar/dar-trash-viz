import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { setActiveOption } from './redux/action-creators'
import Map from './components/map'
import Toggle from './components/toggle'
import Legend from './components/legend'
import Nav from './components/nav'
import Sidebar from './components/sidebar'
import Info from './components/popup'

class Application extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Map store = {store} />
          <Toggle onChange={setActiveOption} />
          <Sidebar />
          <Nav />
          <Info />
          <Legend />
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));
