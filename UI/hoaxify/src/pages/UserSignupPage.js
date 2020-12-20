import React from 'react';
import axios from 'axios';
import {signUp} from '../api/apiCalls';
import  Input from  '../components/Input'
class UserSignupPage extends React.Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false,
        errors: {}
    }

    onChange = event => {
        console.log('girdi');
        const { name, value } = event.target;
        const errors = {...this.state.errors};
        errors[name] = undefined
        this.setState({
            [name]: value,
            errors
        });
    };

    onClickSignUp =  async event => {
        console.log('girdi');
        event.preventDefault();
        const { username, displayName, password } = this.state;
        const body = {
            username,
            displayName,
            password
        }
        this.setState({pendingApiCall : true})
        try {
            const response = await signUp(body);
        } catch (error) {
            // this.setState({errors : error.response.data.validationErrors});  
            console.log(error.response.data);
            if(error.response.data.validationErrors){
                this.setState({errors : error.response.data.validationErrors});
            }
        }
        this.setState({pendingApiCall : false});
    }
    
    render() {
        const {pendingApiCall, errors} = this.state;
        const {username,displayName,password} = errors;
       

        return (
            <div className="container">
                <form>
                    <h1 className="text-center">Sign Up</h1>
                    <Input name="username" label="Username" error ={username} onChange ={this.onChange} type="text"></Input>
                    <Input name="displayName" label="DisplayName" error ={displayName} onChange ={this.onChange} type="text"></Input>
                    <Input name="password" label="Password" error ={password} onChange ={this.onChange} type="password"></Input>
 
                    <div className="form-group">
                        <label>Password Repeat</label>
                        <input className="form-control" name="passwordRepeat" type="password" onChange={this.onChange} />
                    </div>
                    <div className="text-center">
                        <button 
                        className="btn btn-primary" 
                        onClick={this.onClickSignUp}
                        disabled={pendingApiCall}>
                              {pendingApiCall  && <span className="spinner-border spinner-border-sm" ></span> }
                                Sign Up</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserSignupPage;