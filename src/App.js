import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import { withRename } from './producers/withRename'
import { withNewDashboard } from './producers/withNewDashboard'
import { withoutDashboard } from './producers/withoutDashboard'
import { withNewTodo } from './producers/withNewTodo'
import { withoutTodo } from './producers/withoutTodo'
import { withUpdatedTodo } from './producers/withUpdatedTodo'
import './App.scss';
import { FaPlusCircle } from "react-icons/fa";
import MountainVideo from "./components/videos/mountain.mp4"
import Loading from "./components/Loading";


const App = () => {

  const [loading, setloading] = useState(true)
  const [ dashboards, setDashboards ] = useState([])
  const [ dashboardInput, setDashboardInput ] = useState("")

  useEffect(() => {
    setTimeout(()=>{
      setloading(false)
    }, 4000)
  }, [loading])

  useEffect(() => {
    const fetchData = () =>{
      console.log('lefut');
      let fetchInit = {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          // mode: "cors",
          // cache: "no-cache",
          body: JSON.stringify(dashboards)
      };
      fetch('http://localhost:5000/', fetchInit)
          .then(resp => resp.json())
          // .then(data => {
          // })
          .catch(function (error) {
              console.log(error);
          }
          )
        }
        if(dashboards.length){
          fetchData()
         }
}, [dashboards])

useEffect(() => {
    fetch('http://localhost:5000/')
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      console.log(dashboards);
      if(data)setDashboards(data);
    })
    .catch(function (error) {
    }
    )
},[])

  const createDashboard = () => {
    setDashboards(withNewDashboard(dashboards, dashboardInput))
    setDashboardInput("")
  }

  const renameDashboard = (id, newTitle) => {
    setDashboards(withRename(dashboards, id, newTitle))
  }

  const deleteDashboard = (id) => {
    setDashboards(withoutDashboard(dashboards, id))
  }

  const addTodo = (dashboardId, title, description) => {
    setDashboards(withNewTodo(dashboards, dashboardId, title, description))
  }

  const deleteTodo = (dashboardId, todoId) => {
    setDashboards(withoutTodo(dashboards, dashboardId, todoId))
  }

  const updateTodo = (dashboardId, todoId, title, desc) => {
    setDashboards(withUpdatedTodo(dashboards, dashboardId, todoId, title, desc))
  }

  return (
    <>
   {loading ? <Loading/> : <div>
      <video autoPlay muted loop id="myVideo">
         <source src={MountainVideo} type="video/mp4"/>
      </video>
      <nav>
        <input placeholder='Create Dashboard' value={dashboardInput} onChange={(e) => setDashboardInput(e.target.value)} />
        {dashboardInput !== '' &&
        <FaPlusCircle onClick={() => createDashboard()}/>}
      </nav>
      <main>
        { dashboards.map(dashboard =>
          <Dashboard
            key={dashboard.id}
            dashboard={dashboard}
            renameDashboard={renameDashboard}
            deleteDashboard={deleteDashboard}
            addTodo={addTodo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo} />
        ) }
      </main>
    </div>}
    </>
  );
}

export default App;
