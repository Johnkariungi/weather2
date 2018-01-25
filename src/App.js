import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

const PLACES = [
  { name: "Palo Alto", zip: "94303" },
  { name: "San Jose", zip: "94088" },
  { name: "Santa Cruz", zip: "95062" },
  { name: "Honolulu", zip: "96803" },
  { name: "Issaquah", zip: "98029"}
];

// weather display component
class WeatherDisplay extends Component {
  constructor () {
    super();
    this.state = {
      weatherData: null
    };
  }

  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
      fetch(URL).then(res => res.json()).then(json => {
        this.setState({ weatherData: json });
      });
  }
  /*render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading...</div>
    return <div>{JSON.stringify(weatherData)}</div>
    return [
      <h1>Hello {this.props.zip}</h1>
    ];
  }*/

  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading ...</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}° | High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}° | Wind Speed: {weatherData.wind.speed} mi/hr</p>
      </div>
    );
  } 
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      activePlace: 0,
    }
  }

  render() {
    const activePlace = this.state.activePlace;

    return (
     /* <div className="App">
        <header className="App-header">
          <WeatherDisplay 
            zip={PLACES[activePlace].zip}
            key={activePlace}
          />
        </header>
        
        <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Weather App</h1>
          {PLACES.map((place, index) => (
            <button
              key={index}
              onClick={()=> {
                this.setState({ activePlace: index });
                console.log('Clicked index ' + index);
              }}
              >
              {place.name}
              </button>
          ))}
        <p>https://github.com/ericvicenti/intro-to-react</p>
        <p> Map converts each place into a button inside the JSX as an array of buttons with a key for the order of elements.</p>
        
      </div>
      */
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              React Simple Weather App
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3>Select a city</h3>
              <Nav
                bsStyle="pills"
                stacked
                activeKey={activePlace}
                onSelect={index => {
                  this.setState({ activePlace: index });
                }}
              >
                {PLACES.map((place, index) => (
                  <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
