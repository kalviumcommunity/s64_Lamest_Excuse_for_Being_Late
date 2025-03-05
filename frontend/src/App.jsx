import { BrowserRouter , Routes , Route} from "react-router-dom";
import {Landing , Login, Signup, Home} from "./Routes";

function App (){
  return (
    <BrowserRouter>
    <Routes>
      {/* <Route path="/login" element={<LoginPage/>} /> */}
      <Route path="/signup" element={<Signup/>} />
      <Route path="/" element={<Landing/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/home" element={<Home/>} />

    </Routes>
    </BrowserRouter>
  )
}
export default App;