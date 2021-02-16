import React from 'react'

const Header = () => {
    return (
        <header>
        <div className="wrapper">
          <h1>Grocery List</h1>
          {this.state.user ? (
            <button onClick={this.logout}>Logout</button>
          ) : (
            <button onClick={this.login}>Log In</button>
          )}
        </div>
      </header>
    )
}

export default Header
