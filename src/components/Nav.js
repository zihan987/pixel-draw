
import React, { Component } from 'react'
// import { FaBeer } from 'react-icons/fa'
// import { GithubFilled } from '@ant-design/icons'
// import { Space } from 'antd'
import './Nav.css'



class Nav extends Component {

  // logo = require("./1.svg")

  render () {

    return (

      <div className="nav">

        <div className="nav-title" style={{ position: 'absolute', left: '50%', }}>有趣的像素绘画</div>
        {/* <div className="image">
          <img src="github.jpg" />
        </div> */}
        <img src={require('./github.jpg')} style={{ width: '56px', height: '46px', margin: '2px' }} />
        <a href="https://github.com/zihan987/pixel-draw" style={{ width: '56px', height: '46px', color: "#777", position: 'absolute', margin: '2px' }}>GitHub</a>


      </div>

    )

  }

}



export default Nav

