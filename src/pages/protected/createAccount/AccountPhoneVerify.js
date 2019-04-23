import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import fulllogo from '../../../assets/img/rchain-fulllogo.svg';
import BasicInput from '../../../components/form-inputs/BasicInput';
import Button from '../../../components/buttons/Button';
import { startLoader, stopLoader } from '../../../redux/actions/loaderActions';
import { logout } from '../../../helpers/logout';
import { validateCodeForm } from '../../../validators/accountCreateValidators';
import { submitMobileVerificationCode, resendMobile } from '../../../redux/actions/authActions';

class AccountPhoneVerify extends Component {
	constructor(props) {
        super(props);
        this.state = {
			code: '',
			errors: {},
			errorModal: false,
			errorModalMessage: ''
        };
	}

	closeErrorModal = () => {
        this.setState({
            errorModal: false,
        })
	}
	
	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	}

	onCancel = () => {
		logout(this.props.history);
	}

	onResend = () => {
		this.props.startLoader();
		resendMobile()
		.then((response) => {
			console.log(response);
			this.props.stopLoader();		
		})
		.catch((error) => {
			console.log(error);
			this.props.stopLoader();
			this.setState({
				errorModal: true,
				errorModalMessage: 'Error submiting your data'
			})
		});
	}

	submitForm = () => {
		const validForm = this.validateForm();
		if (validForm) {
			this.props.startLoader();
			submitMobileVerificationCode(this.state.code)
			.then((response) => {
				const user = JSON.parse(localStorage.getItem('login'));
				localStorage.setItem('login', JSON.stringify({ ...user, require_mobile_verification: false }));
				this.props.stopLoader();
				if (user.require_kyc) {
					this.props.history.push('/kyc');
				} else {
					this.props.history.push('/');
				}				
			})
			.catch((error) => {
				console.log(error);
				this.props.stopLoader();
				this.setState({
					errorModal: true,
					errorModalMessage: 'Error submiting your data'
				})
			});
		}
	}

	validateForm = () => {
		let errors = {};
		errors = validateCodeForm(this.state);
        this.setState({ errors })
        if (Object.keys(errors).length > 0 && errors.constructor === Object) {
            console.log(errors);
            return false;
        }
        return true;
	}

	render() {
		return (
			<div className="w-100 vh-100 flex">
				<div className="w-50 bg-blue">
					<div className="w-100 pt2 pl2"><img src={fulllogo} alt="" /></div>
					<div className="ph5 pt5">
						<p className="f1 b white lh-title mb0">Verify your<br /> phone<br /> number</p>
            			<p className="f6 white lh-copy">Already have an RSong account?<br />
							<a onClick={this.onCancel} className="f6 white underline pointer">Log in with the correct google or facebook account.</a>
						</p>
					</div>
				</div>
				<div className="w-50 ph5 pt7 bg-black">
					<span className="white ph0 pt0 f3 b ttc flex justify-between border-box lh-title">A text has been sent to:<br />+1 310 555 2345</span>
					<p className="f5 white lh-copy">You will recieve a text message with a validation code. Enter it below.</p>
					<fieldset className="bn ph0 pt3 mb2">
						<BasicInput 
							name="code"
							value={this.state.code}
							error={this.state.errors.code}
							placeholder="Validation code *"
							theme="dark"
							onChange={this.handleChange}
						/>
					</fieldset>
					<div className="pb4">
						<Button
							name="continue"
							buttonText="Continue"
							theme="dark"
							onClick={this.submitForm}
						/>
					</div>
					<p className="f6 white lh-copy">Didn’t receive a text? <a onClick={this.onResend} className="f6 white underline pointer">Click here to resend.</a></p>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
		startLoader: () => dispatch(startLoader()),
		stopLoader: () => dispatch(stopLoader())
    }
}

const AccountPhoneVerifyRedux = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccountPhoneVerify);

export default withRouter(AccountPhoneVerifyRedux);