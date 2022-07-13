import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import store from '../store'
import DraggablePanel from './DraggablePanel'
import ToolButton from './ToolButton'
// import CleanButton from './CleanCanvas'
import { ChromePicker } from 'react-color'
import './ToolsContainer.css'
// import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons'
// import { Button, Radio } from 'antd'
// import "antd/dist/antd.css"
// import { DownloadOutlined } from '@ant-design/icons'
// import { Button, Radio } from 'antd'


// 画布编辑工具容器
class ToolsContainer extends Component {
  // 属性
  constructor(props) {
    super(props)
    // 状态
    this.state = {
      // 显示颜色选择器
      showColorPicker: true,
      // 画布的宽度（可更改）
      width: this.props.canvas.width,
      // 画布的高度（可更改）
      height: this.props.canvas.height
    }
    this.pixels = []
  }

  // 更新画布
  updatePixels (width, height) {
    const oldPixels = this.pixels
    this.pixels = []

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const pixelIndex = oldPixels.findIndex((p) => { return p.x === x && p.y === y })
        const newPixel = pixelIndex === -1 ? { x: x, y: y, c: { r: 0, g: 0, b: 0, a: 0 } } : oldPixels[pixelIndex]
        this.pixels.push(newPixel)
      }
    }
  }

  // 更新状态
  updateState () {
    window.location.reload()
  }

  // 清除画布
  ClearCanvas (event) {
    this.setState({ gridColor: parseInt(event.target.value) })
    // store.dispatch({ type: 'SET_COLOR', payload: color.rgb })
  }

  // 设置工具
  setTool (tool) {
    store.dispatch({ type: 'SET_TOOL', payload: tool })
  }

  // 控制颜色变化
  handleColorChange (color) {
    store.dispatch({ type: 'SET_COLOR', payload: color.rgb })
  }

  // 控制空间变化
  handleZoomChange (event) {
    store.dispatch({ type: 'SET_ZOOM', payload: parseInt(event.target.value) })
  }

  // 控制画布宽度变化
  handleWidthChange (event) {
    this.setState({ width: parseInt(event.target.value) })
  }

  // 控制画布高度变化
  handleHeightChange (event) {
    this.setState({ height: parseInt(event.target.value) })
  }

  // 设置新的画布尺寸 W * H
  setNewSize () {
    store.dispatch({ type: 'SET_SIZE', payload: { width: this.state.width, height: this.state.height } })
  }

  // 切换网格
  toggleGrid () {
    store.dispatch({ type: 'TOGGLE_GRID', payload: null })
  }

  // 保存图片
  save () {
    store.dispatch({ type: 'TRIGGER_SAVING', payload: null })
  }



  render () {
    const c = this.props.canvas.color

    // 设置颜色面板的样式
    const colorStyle = {
      margin: '10px auto',
      width: '32px',
      height: '32px',
      background: `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`,
      border: '1px solid #222'
    }

    // 设置可选择的画布的尺寸大小
    const zooms = [1, 5, 10, 20, 30, 40, 50].map((z) => {
      return <option key={z} value={z}>{z}x</option>
    })

    // 输入自定义的画布宽高
    const sizeInput = {
      display: 'inline-block',
      width: '50px'
    }
    // const [size, setSize] = useState('middle')

    return (

      // 整个的工具容器
      <div className="tools-container">

        {/* 可拖动面板 Tools */}
        <DraggablePanel title="Tools" x={10} y={60}>



          {/* 画笔 */}
          <ToolButton title="Pencil" icon="pencil" handleClick={this.setTool.bind(this, 'PEN')} active={this.props.canvas.tool === 'PEN'} />
          <ToolButton title="Eraser" icon="eraser" handleClick={this.setTool.bind(this, 'ERASER')} active={this.props.canvas.tool === 'ERASER'} />
          {/* <br /> */}

          <div>
            <ToolButton title="Flood Fill" icon="tint" handleClick={this.setTool.bind(this, 'FILL')} active={this.props.canvas.tool === 'FILL'} />
            {/* 清屏 */}
            {/* <ToolButton
            title="CLear"
            icon="trash"
            handleClick={this.setTool.bind(this, 'CLEAN')}
            active={this.props.canvas.tool === 'CLEAN'} /> */}
            {/* <CleanButton title="CleanTheCanvas" icon="trash" /> */}
            <button className="MyButton" icon="trash" style={{ fontSize: '5px' }} onClick={this.updateState.bind(this)} >AC</button>
            {/* <Button type="primary" icon={<DownloadOutlined />} size={size} /> */}
            {/* <DeleteOutlined /> */}
          </div>

          <hr style={{ borderColor: '#666' }} />
          <div style={colorStyle}></div>
          <hr style={{ borderColor: '#666' }} />
          <ToolButton title="Toggle Grid" icon="th-large" handleClick={this.toggleGrid.bind(this)} active={this.props.canvas.showGrid} />

          <ToolButton title="Save" icon="save" handleClick={this.save.bind(this)} />

          <hr style={{ borderColor: '#666' }} />

          <label><i className="fa fa-search-plus"></i> </label>
          <select onChange={this.handleZoomChange.bind(this)} value={this.props.canvas.zoom}>
            {zooms}
          </select>

          <hr style={{ borderColor: '#666' }} />

          <label>Canvas Size</label><br />
          <input type="number" value={this.state.width} onChange={this.handleWidthChange.bind(this)} style={sizeInput} />
          x
          <input type="number" value={this.state.height} onChange={this.handleHeightChange.bind(this)} style={sizeInput} />
          <br />
          <br />
          <button onClick={this.setNewSize.bind(this)}>Set Size</button>
        </DraggablePanel>

        {this.state.showColorPicker && <DraggablePanel title="Color" x={160} y={60}>
          <ChromePicker color={this.props.canvas.color} onChangeComplete={this.handleColorChange.bind(this)} />
        </DraggablePanel>}
      </div>
    )
  }
}

ToolsContainer.propTypes = {
  canvas: PropTypes.object
}

function mapStateToProps (store) {
  return {
    canvas: store.canvasState
  }
}

export default connect(mapStateToProps)(ToolsContainer)
