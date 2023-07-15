import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar2 from "./Navbar2";
import Addproduct from "./Addproduct";
import Productlist from "./productlist";
import Adduser from "./Adduser";
import NoteState from "../context/notes/NoteState";


// import Edituser from './Edituser';
export default function Homepage() {



  
  return (
    <>
      <NoteState>
        <Router>
          <Navbar2 />
       
          <Switch>
            <Route exact path="/Addproduct" component={Addproduct} />
            <Route exact path="/productlist" component={Productlist} />
            <Route exact path="/edit/:_id" component={Addproduct} />
            {/* <Route exact path='/edit/:_id' component={Edituser} /> */}

               <Route exact path="/adduser" component={Adduser} />
           
           

       

           

       
          </Switch>
        </Router>
      </NoteState>
      
    </>
  );
}
