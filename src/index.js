import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Link} from 'react-router-dom'
import './index.css';
import Wheel from './wheel.js';


const flavor_names = [
            "野菜",
            "酸味/発酵",
            "フルーツ",
            "花",
            "甘味",
            "ナッツココア",
            "香辛料",
            "焼き",
            "その他"
          ]

const MainPage = (props) =>{
	return(
		<div className='Page{props.num}'> 
			<h1>'coffee{props.num}'</h1>
			<NextButton page={props.next} />
		</div>
	);
};
const OtherPage = (props) =>{
	return(
		<div className='Page{props.num}'> 
			<h1>'coffe{props.num}'</h1>
			<BeforeButton page={props.before} />
			<NextButton page={props.next} />
		</div>
	);
};
const BeforeButton = (props) =>{
		return(
			<Link to = {props.page}>
				    <button>{'Before'}</button>
			</Link>
		);
};
const NextButton = (props) =>{
		return(
			<Link to = {props.page}>
				    <button>{'Next'}</button>
			</Link>
		);
};

const Pagenation = () => {
	return(
		<div>
			<BrowserRouter>
				<div>
				   <Route path='/' exact render={() => 
						   < MainPage num= {1} next='/page2'/> } />
				   <Route path='/page2' render={() => 
						   < OtherPage num= {2} next='/page3' before = '/' /> } />
				   <Route path='/page3' render={() => 
						   < OtherPage num= {3} next='/page4' before= '/page2' /> } />
				   <Route path='/page4' render={() => 
						   < OtherPage num= {4} next='/' before= '/page3' /> } />
				</div>
			</BrowserRouter>
		</div>
   );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    const flavors = flavor_names.map(name => {
      return {
        name: name,
        selected: false
      }
    });
    this.state = {
      flavors: flavors,
    };
  }

  render() {
    return (
      <div className="service">
        <div className="service-board">
          <Wheel
            flavors={this.state.flavors}
          />
        </div>
        <div className="pagenation">
          <Pagenation/>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
