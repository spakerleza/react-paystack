import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PayStack extends Component {

	constructor(props){
		super(props);
		this.state = {
			text: this.props.text || "Make Payment",
			class: this.props.class || "",
			metadata: this.props.metadata || {},
			currency: this.props.currency || "NGN",
			plan: this.props.plan || "",
			quantity: this.props.quantity || "",
			subaccount: this.props.subaccount || "",
			transaction_charge: this.props.transaction_charge || 0,
			bearer: this.props.bearer || ""
		}
	}

	 payWithPaystack = () => {
			const handler = window.PaystackPop.setup({
				key: this.props.paystackkey,
				email: this.props.email,
				amount: this.props.amount,
				ref: this.props.reference,
				metadata: this.state.metadata,
				callback: (response) => {
					this.props.callback(response)
				},
				onClose: () => {
					this.props.close()
				},
				currency: this.state.currency,
				plan: this.state.plan,
				quantity: this.state.quantity,
				subaccount: this.state.subaccount,
				transaction_charge: this.state.transaction_charge,
				bearer: this.state.bearer
			});
			handler.openIframe();
	}

	render(){
		return (
			<span>
				<button onClick={this.payWithPaystack} className={this.state.class}>{this.state.text}</button>
			</span>
		);
	}
}

PayStack.propTypes = {
	text: PropTypes.string,
	class: PropTypes.string,
	metadata: PropTypes.object,
	currency: PropTypes.string,
	plan: PropTypes.string,
	quantity: PropTypes.string,
	subaccount: PropTypes.string,
	transaction_charge: PropTypes.number,
	bearer: PropTypes.string,
	reference: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired, //in kobo
	paystackkey: PropTypes.string.isRequired,
	callback: PropTypes.func.isRequired,
	close: PropTypes.func.isRequired
}

export default PayStack;