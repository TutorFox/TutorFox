import React, { Component } from 'react';
import { NICE, SUPER_NICE } from './colors';
import Router from 'react-router';
let { RouteHandler } = Router;


export class App extends Component {
  render() {
    return (
      <div>
        <RouteHandler/>
      </div>
    );
  }
}
