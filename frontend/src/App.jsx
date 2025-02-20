import { BrowserRouter , Routes , Route} from "react-router-dom";
import {Home , Login, Signup} from "./Routes";

function App (){
  return (
    <BrowserRouter>
    <Routes>
      {/* <Route path="/login" element={<LoginPage/>} /> */}
      <Route path="/signup" element={<Signup/>} />
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />

    </Routes>
    </BrowserRouter>
  )
}
export default App;