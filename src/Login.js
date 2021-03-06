import axios from 'axios';
import React,{useState} from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router';
import './styles/login.css'
import Cookies from 'js-cookie';
export default function Login() {
    let history = useHistory();
    const [id, setID] = useState();
    const [password, setPassword] = useState(); 
    var jwt; 
    axios.interceptors.request.use(
        config => {
          config.headers.authorization = `Bearer ${jwt}`;
          return config; 
        },
        e => {
          return Promise.reject(e)
        }
       ) 

    function handleLogin() {
               
        axios.post('https://wewallet.herokuapp.com/admin-login', {
            id: "615c8d630307311c64879f60",
            password:"StrongPassword#007"
        })
        .then((res) => {

            jwt = res.data.jwt;
            history.push({
                pathname: '/adminpanel',
                state: {
                  authorized:true,
                  id: id,
                  jwt:res.data.jwt
                },
            })
        }, (e) => {
            console.log(e);
        });        
        
        axios.get('https://wewallet.herokuapp.com/create-admin-wallet')
            .then((res) => {
                console.log('successfully created admin wallet');
            }, (e) => {
                console.log(e);
            });
   }

    return (
        <div className="login">
           <div> 
            <label for="fname">Admin ID:</label><br />
            <input type="text" id="fname" name="fname"onChange={(e)=>setID(e.target.value)} /><br />
            <label for="lname">Password:</label><br />
            <input type="text" id="lname" name="lname" onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <Button variant="dark" type="submit" onClick={handleLogin} className="lgbt">
                Login
            </Button>
           
        </div>
    )
}
