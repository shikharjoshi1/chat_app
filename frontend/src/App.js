import "./App.css";
// import { Button } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";
import { Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path='/' component={homepage} exact/>
      <Route path='/chats' component={ChatPage}/> 
      {/* <Button colorScheme='blue'>Button</Button> */}
    </div>
  );
}

export default App;
