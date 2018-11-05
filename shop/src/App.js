import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom'
import axios from 'axios'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap'


const items = [{ name: 'Brooke', price: '12.00 USD', image: '/images/clothing/brooke.jpg', catergory: "clothing" },
{ name: 'James', price: '23.00 USD', image: '/images/clothing/james.jpg', catergory: "clothing" },
{ name: 'Modern', price: '26.00 USD', image: '/images/clothing/modern.jpg', catergory: "clothing" },
{ name: 'Shadow', price: '17.00 USD', image: '/images/clothing/shadow.jpg', catergory: "clothing" },
{ name: 'Vintage', price: '14.00 USD', image: '/images/clothing/Neel.jpg', catergory: "clothing" },
{ name: 'Adinda', price: '9.00 USD', image: '/images/clothing/Adinda.jpg', catergory: "clothing" },
{ name: 'Janko', price: '14.00 USD', image: '/images/clothing/janko.jpg', catergory: "clothing" },
{ name: 'Sang Hyun', price: '344.00 USD', image: '/images/clothing/johen.jpg', catergory: "clothing" },
{ name: 'Kal', price: '44.00 USD', image: '/images/clothing/kal.jpg', catergory: "clothing" }, { name: 'Ray Bans', price: '120.00 USD', image: '/images/accessories/raybans.jpg', catergory: "acessories" },
{ name: 'Jesse Watch', price: '250.00 USD', image: '/images/accessories/jesse.jpg', catergory: "acessories" },
{ name: 'Fedora', price: '50.00 USD', image: '/images/accessories/fedora.jpg', catergory: "acessories" }]

class App extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      users: [],
      cart: [],
      counter: 0,
      message: 'Welcome To The Site'
    }
  }

  addCart = (clothing) => {
    alert("Added to Cart!")
    this.setState({
      cart: this.state.cart.concat(clothing),
      counter: this.state.counter + 1
    }
      , () => {
        axios.post('http://localhost:8080/shop', this.state.cart)
      }
    )
  }

  deleteFromCart = (item) => {
    this.setState({
      cart: this.state.cart.filter(cartItem => cartItem.name != item),
      counter: this.state.counter - 1
    })
  }

  name = (name) => {
    this.setState({
      name: name
    })

    if (this.state.users.indexOf(name)=== -1) {
      this.setState({
        users: this.state.users.concat(name)
      })
    }
    else{
      this.setState({
        message: "Welcome Back"
      })
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8080/shop')
      .then((res) => {
        this.setState({
          cart: res.data
        })
      })
      
    if (localStorage.names) {

      let names = JSON.parse(localStorage.getItem('names'))
      this.setState({
        users: names
      })
    }
  }

  componentDidUpdate = () => {
    localStorage.setItem('names', JSON.stringify(this.state.users))
  }

  render() {
    return (

      <div className="App">

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/home">BKA</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home" >Home </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">Shop</Link>
              </li>
            </ul>
            <p className="form-inline my-2 my-lg-0">

              <Link to="/cart" className="btn btn-info btn-lg glyphicon glyphicon-shopping-cart">
                Shopping Cart <span class="badge badge-light">{this.state.counter}</span>
              </Link>
            </p>
          </div>
        </nav>


        <Switch>
          <Route path="/" exact render={(routerProps) => <Welcome  users={this.state.users} name={this.name} {...routerProps} />} ></Route>
          <Route path="/home" render={(routerProps) => <Home message= {this.state.message} users={this.state.users} name={this.state.name} {...routerProps} />} ></Route>
          <Route path="/shop" render={(routerProps) => <Shop addCart={this.addCart} {...routerProps} />} ></Route>
          <Route path="/cart" render={(routerProps) => <Cart cart={this.state.cart} deleteFromCart={this.deleteFromCart} {...routerProps} />} ></Route>
        </Switch>

      </div>

    );
  }
}

class Welcome extends Component {

  state = {
    name: ""
  }

  nameInput = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  render() {

    return (
      <div className="App-header">

        <form className="animated bounceIn" action="/action_page.php">
          <div className="form-group" >
            <label className="text-color" for="email">Name</label>
            <input onChange={this.nameInput} type="name" class="form-control" id="email" />
          </div>

          <Link to="/home"><button onClick={() => this.props.name(this.state.name)}>Submit</button> </Link>
        </form>
      </div>

    )
  }
}

class Home extends Component {
  render() {
    let msg
    if (this.props.message === "Welcome To The Site") {
      msg = this.props.message + " " + this.props.name + "!" + " We have signed you up in our system"
    }
    else {
      msg= this.props.message + " " + this.props.name + "!"
    }
    return (
      <div className="back">
        <div className="App-header animated pulse">
          <h1 className="title">{msg}</h1>
        </div>
      </div>
    )
  }
}

class Shop extends Component {

  render() {

    return (
      <div>

        <nav>
          <Link to={this.props.match.url + '/clothing'} > Clothing </Link>
          <Link to={this.props.match.url + '/accessories'} > Accessories </Link>
        </nav>
        <Switch>
          <Route path={this.props.match.path + '/clothing'} exact render={() => <Clothing addCart={this.props.addCart} />} ></Route>
          <Route path={this.props.match.path + '/accessories'} render={() => <Accessories addCart={this.props.addCart} />} ></Route>
        </Switch>

      </div>
    )
  }
}


class Clothing extends Component {

  render() {
    let clothing = items.filter((item) => item.catergory === 'clothing')
    let clothingmap = clothing.map((clothing, i) => {
      return <div className=" col-sm-12 col-md-6 col-lg-4"><div className="margin imgfluid">
        <div className="animated flipInY card" width="18rem" height="18rem">
          <div className="cardBorder"><img className="card-img-top" src={clothing.image} alt="Card image cap" height="350" width="100%" />
            <div className="card-body"></div>
            <h5 className="title card-title">{clothing.name}</h5>
            <p className="card-text">{clothing.price}</p>
            <button onClick={() => this.props.addCart(clothing)} className="btn btn-primary btn-group-toggle">Add To Cart</button>

          </div>
        </div>

      </div></div>
    })
    return (
      <div>
        <h1 className="title animated flipInY">Clothing</h1>

        <div className="container">
          <div className="row">
            {clothingmap}
          </div>
        </div>

      </div>

    )
  }
}

class Accessories extends Component {
  render() {
    let accessories = items.filter(item => item.catergory === 'acessories')
    let accessoriesmap = accessories.map(accessory => {
      return <div className=" col-sm-12 col-md-6 col-lg-4"><div className="margin imgfluid">
        <div className="card animated flipInY " width="18rem" height="18rem">
          <div className="cardBorder"><img className="card-img-top" src={accessory.image} alt="Card image cap" height="350" width="100%" />
            <div className="card-body"></div>
            <h5 className="title card-title">{accessory.name}</h5>
            <p className="card-text">{accessory.price}</p>
            <button onClick={() => this.props.addCart(accessory)} className="btn btn-primary">Add To Cart</button>
          </div>
        </div>

      </div></div>
    })
    return (
      <div>
        <h1 className=" title animated flipInY">Accessories</h1>

        <div className="container">
          <div className="row">
            {accessoriesmap}
          </div>
        </div>

      </div>
    )
  }
}

class Cart extends Component {

  render() {
    let cart = this.props.cart.map((item, i) => {
      return <div className=" col-sm-12 col-md-6 col-lg-4"><div className="margin imgfluid">
        <div className="card" width="18rem" height="18rem">
          <img className="card-img-top" src={item.image} alt="Card image cap" height="300" width="300" />
          <div className="card-body">
            <h5 className="title card-title">{item.name}</h5>
            <p className="card-text">{item.price}</p>
            <button onClick={() => this.props.deleteFromCart(item.name)} className="btn btn-primary">Delete From Cart</button>
          </div>
        </div>

      </div></div>
    })

    return (
      <div>
        <h1>Cart</h1>

        <div className="container">
          <div className="row">
            {cart}
          </div>
        </div>

      </div>
    )
  }
}

export default App;
