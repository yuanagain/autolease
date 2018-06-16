'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  Viro360Image,
  ViroAmbientLight,
  ViroARImageMarker,
  ViroARScene,
  ViroARTrackingTargets,
  ViroBox,
  ViroPortal,
  ViroPortalScene,
  ViroText,
  ViroConstants,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    ViroARTrackingTargets.createTargets({
      "targetOne" : {
        source : require('./res/IMG_3059.JPG'),
        orientation : "Up",
        physicalWidth : 0.1 // real world width in meters
      },
    });


    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        <ViroARImageMarker target={"targetOne"} >
          <ViroBox 
            height={2}
            length={2}
            width={2}
            position={[0, .25, 0]} 
            scale={[.5, .5, .5]} />
        </ViroARImageMarker>

        <ViroAmbientLight color="#ffffff" intensity={200}/>
        <ViroPortalScene passable={true} dragType="FixedDistance" onDrag={()=>{}}>
          <ViroPortal position={[0, 0, -1]} scale={[.1, .1, .1]}>

          </ViroPortal>
          <Viro360Image source={require("./res/guadalupe_360.jpg")} />
        </ViroPortalScene>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldSceneAR;
