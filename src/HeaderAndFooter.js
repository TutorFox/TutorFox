import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import Router from 'react-router';
let { RouteHandler } = Router;

export class HeaderAndFooter extends React.Component {
  render () {
    return (
      <div>
        <Header/>
        <RouteHander/>
        <Footer/>
      </div>
    )
  }
}
