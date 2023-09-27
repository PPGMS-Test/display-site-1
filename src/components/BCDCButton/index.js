import React, { Component } from 'react'
import CreateOrderObject from "../LoadPayPalScript/createOrderObject";
import PayPal_SPB_JS_SDK_LoadScript from "../LoadPayPalScript/JSSDK";

export default class BCDC extends Component {
  componentDidMount() {
    if(window.paypal){
      let button = window.paypal.Buttons({
        fundingSource:window.paypal.FUNDING.CARD,
        ...CreateOrderObject
      });
      if(button.isEligible()){
        button.render("#paypal-button-container")
      }
    }
     
  }
  render() {
    return (
      <div><div id="paypal-button-container"></div></div>
    )
  }
}
