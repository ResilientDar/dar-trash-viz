import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { setActiveOption } from './redux/action-creators'
import { setLegendActiveOption } from './redux/action-creators'
import { setAnalysisActiveOption } from './redux/action-creators'
import { changeMoreAnalysis } from './redux/action-creators'
import { setMoreStats } from './redux/action-creators'
import { setInfoActive } from './redux/action-creators'
import Map from './components/map'
import Toggle from './components/toggle'
import Info from './components/info'
import Nav from './components/nav'
import Legend from './components/legend'
import Analysis from './components/analysis'
import Notification from './components/notification' 
import Stats from './components/stats'

class Application extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Map store = {store} />
          <Notification onClick={setMoreStats} />
          <Stats/>
          <Toggle onChange={setActiveOption} />
          <Analysis onChange={setAnalysisActiveOption} onClick={changeMoreAnalysis}/>

          <Info onClick={setInfoActive}/>
          <Nav />
          <Legend onChange={setLegendActiveOption}/>
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));
