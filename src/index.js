import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Link} from 'react-router-dom'
import './index.css';

const MainPage = (props) =>{
	return(
		<div className='Page{props.num}'> 
			<h1>'coffe{props.num}'</h1>
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

const App = () => {
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
// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
