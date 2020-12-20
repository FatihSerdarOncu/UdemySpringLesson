import React from 'react';
import axios from 'axios';
import {signUp} from '../api/apiCalls';

export class DenemeSignUp  extends React.Component{

    state = {
        username = null,
        displayName = null,
        password = null,
        pendingApiCall = null
    };

    onChange = (event) => {
         // Değişiklikle onChange'den yakalanan veriyi state'e setle.
        const {name, value} = event.target;
        this.setState({
            [name] : value
        });
    }

    onSignUp = async event =>{
        //State den verileri al, signup servisi ile backend'e gönder

        const {username,displayName,password} = this.state;
        const body = {
            username,
            displayName,
            password
        };

        try {
            this.setState({pendingApiCall : true});
            const response = await signUp(body);
            
        } catch (error) {
            this.setState({
                pendingApiCall = false
            });
        }
    }

    render(){
        return (
            <div>
                asdfafafa
            </div>
        );
    };
}
