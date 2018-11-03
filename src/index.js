import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { setActiveOption } from './redux/action-creators'
import { setActiveLegendOption } from './redux/action-creators'
import Map from './components/map'
import Toggle from './components/toggle'
import Info from './components/info'
import Nav from './components/nav'
import Legend from './components/legend'


class Application extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Map />
          <Toggle onChange={setActiveOption} />
          <Info />
          <Nav />
          <Legend onChange={setActiveLegendOption}/>
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));
