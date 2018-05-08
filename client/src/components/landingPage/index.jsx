import React, { Component } from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import * as colors from 'material-ui/styles/colors';

const toolbarStyle = {
  backgroundColor: colors.grey900
}

const toolbarTitleStyle = {
  color: colors.yellow500
}

class ClientTab extends Component {
  constructor(props) {
      super(props);
  }
  render() {
      return (
          <div className='wrapper'>
              <div className='outerContainer'>
                <div className='innerContainer'>
                <div className="row">
                  <div className="column">
                  <form className="search">
                    <input type="text" className="textbox" placeholder="Filter"></input>
                    <input title="Search" value="" type="submit" className="button"/>
                  </form>
                </div>
                  <div className="column">
                    <button className="addClientButton" >Add a Client</button>
                  </div>
                  <div className="column">
                    <div id="cardPlaceHolder">
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="column"><Card className = 'clientCard'>
                    <CardText className ='clientCardText'
                      // avatar="images/ok-128.jpg"
                    > 
                    <div className="name">Jake Barber</div>
                    </CardText>
                  </Card></div>
                  <div className="column"><Card className = 'clientCard'>
                    <CardText className ='clientCardText'
                      // avatar="images/ok-128.jpg"
                    > 
                    <div className="name">Jake Barber</div>
                    </CardText>
                  </Card></div>
                  <div className="column"><Card className = 'clientCard'>
                    <CardText className ='clientCardText'
                      // avatar="images/ok-128.jpg"
                    > 
                    <div className="name">Jake Barber</div>
                    </CardText>
                  </Card></div>
                </div>
                <div className="row">
                  <div className="column"><Card className = 'clientCard'>
                    <CardText className ='clientCardText'
                      // avatar="images/ok-128.jpg"
                    > 
                    <div className="name">Jake Barber</div>
                    </CardText>
                  </Card></div>
                  <div className="column"><Card className = 'clientCard'>
                    <CardText className ='clientCardText'
                      // avatar="images/ok-128.jpg"
                    > 
                    <div className="name">Jake Barber</div>
                    </CardText>
                  </Card></div>
                  <div className="column"><Card className = 'clientCard'>
                    <CardText className ='clientCardText'
                      // avatar="images/ok-128.jpg"
                    > 
                    <div className="name">Jake Barber</div>
                    </CardText>
                  </Card></div>
                </div>
                </div>
              </div>
          </div>
      );
  }
}

class LandingPage extends Component {
  render() {
    return (
      //this toolbar may need to be a separate component
      <div>
      <Toolbar style={toolbarStyle} className="landingPageToolBar">
        <ToolbarGroup firstChild={true}>
          <ToolbarTitle style={toolbarTitleStyle} text="BoostPT"/>
        </ToolbarGroup>

        <ToolbarGroup>
          <Link to="/signup"><RaisedButton label="Signup" /></Link>
          <Link to='/login'><RaisedButton label="Login" /></Link>
        </ToolbarGroup>
      </Toolbar>
      </div>
    )
  }
}


export default LandingPage;