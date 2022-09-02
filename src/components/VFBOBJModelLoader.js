import React, { Component } from 'react';
import Canvas from "@metacell/geppetto-meta-ui/3d-canvas/Canvas";
import CameraControls from "@metacell/geppetto-meta-ui/camera-controls/CameraControls";
import { withStyles } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import { applySelection, mapToCanvasData } from "@metacell/geppetto-meta-ui/3d-canvas/utils/SelectionUtils"
import CaptureControls from "@metacell/geppetto-meta-ui/capture-controls/CaptureControls";

const instanceSpec = {
  "eClass": "SimpleInstance",
  "id": "ANeuron",
  "name": "VFB Obj Loader",
  "type": { "eClass": "SimpleType" }
  // , "visualValue": {
  //   "eClass": Resources.OBJ,
  //   'gltf': neuron
  // }
}

function loadInstances (){
  // ModelFactory.cleanModel();
  // const instance1 = new SimpleInstance(instance1spec)
  // window.Instances = [instance1, instance2]
  // augmentInstancesArray(window.Instances);
}

function getProxyInstances () {
  // return window.Instances.map(i => (
  //   { instancePath: i.getId(), color: { r: 0, g:1, b: 0, a:1 } }))
}

const styles = () => ({
  container: {
    height: '800px',
    width: '1240px',
    display: 'flex',
    alignItems: 'stretch',
  },
});

class VFBOBJModelLoader extends Component {
  constructor (props) {
    super(props);
    loadInstances()
    this.state = {
      data: getProxyInstances(),
      showLoader: true,
      cameraOptions: {
        angle: 50,
        near: 0.01,
        far: 1000,
        baseZoom: 1,
        cameraControls: {
          instance: CameraControls,
          props: { wireframeButtonEnabled: false },
        },
        initialFlip: ['y', 'z'],
        reset: false,
        autorotate: false,
        wireframe: false,
      },
      showModel: false
    };
    this.hoverHandler = this.hoverHandler.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.onSelection = this.onSelection.bind(this)
    this.onMount = this.onMount.bind(this);
    this.layoutRef = React.createRef();
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }


  hoverHandler (objs, canvasX, canvasY) {
  }

  handleToggle () {
    this.setState({ showLoader: true })
    loadInstances()
    this.setState({ showModel: true, showLoader: false, data: getProxyInstances(), cameraOptions: { ...this.state.cameraOptions, } })
  }

  handleClickOutside (event) {
    if (this.node && !this.node.contains(event.target)) {
      if (event.offsetX <= event.target.clientWidth){
        this.setState({ showModel: false })
      }
    }
  }

  onMount (scene){
    console.log(scene)
  }

  onSelection (selectedInstances){
    this.setState({ data: applySelection(this.state.data, selectedInstances) })
  }

  render () {
    const { data, cameraOptions, showModel, showLoader } = this.state
    const canvasData = undefined; //mapToCanvasData(data)
    const { classes } = this.props

    const captureOptions = {
      captureControls: {
        instance: CaptureControls,
        props: {}
      },
      recorderOptions: {
        mediaRecorderOptions: { mimeType: 'video/webm', },
        blobOptions:{ type: 'video/webm' }
      },
      screenshotOptions:{
        resolution:{
          width: 3840,
          height: 2160,
        },
        quality: 0.95,
        pixelRatio: 1,
        filter: () => true
      },
    }

    return showLoader ? <div>OBJ Model Loading...</div> : 
      <div ref={node => this.node = node} className={classes.container}>
        <>
          <Canvas
            ref={this.canvasRef}
            data={canvasData}
            cameraOptions={cameraOptions}
            captureOptions={captureOptions}
            backgroundColor={0x505050}
            onSelection={this.onSelection}
            onMount={this.onMount}
            onHoverListeners={{ 'hoverId':this.hoverHandler }}
          />
        </>
      </div>
  }
}

export default withStyles(styles)(VFBOBJModelLoader);
