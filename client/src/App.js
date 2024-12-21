
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route>
      {/* <Route exact path="/" element={<Signup/>}/>
      <Route exact path="/signin" element={<Signin/>}/> */}
      <Route exact path="/home" element ={<Home/>}/>
      
        </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
