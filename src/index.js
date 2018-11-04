import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { setActiveOption } from './redux/action-creators'
import { setActiveLegendOption } from './redux/action-creators'
import { setInfoActive } from './redux/action-creators'
import Map from './components/map'
import Toggle from './components/toggle'
import Info from './components/info'
import Nav from './components/nav'
<<<<<<< HEAD
import Legend from './components/legend'

=======
import Sidebar from './components/sidebar'
import Info from './components/popup'
>>>>>>> eca7eb19c2e7bc2f07a0665abdd22df9630f275a

class Application extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Map store = {store} />
          <Toggle onChange={setActiveOption} />
<<<<<<< HEAD
          <Info onClick={setInfoActive}/>
=======
          <Sidebar />
>>>>>>> eca7eb19c2e7bc2f07a0665abdd22df9630f275a
          <Nav />
          <Info />
          <Legend onChange={setActiveLegendOption}/>
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));
