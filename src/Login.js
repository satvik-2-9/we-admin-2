import React,{useState} from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router';
import './styles/login.css'
export default function Login() {
    let history = useHistory();
    const [id, setID] = useState();
    const [password, setPassword] = useState(); 
    
    function handleLogin() {
        /*         axios.post('https://wewallet.herokuapp.com/admin-login', {
            id: id,
            password:password
        })
        .then(() => {
            history.push({
                pathname: '/adminpanel',
                state: {
                  authorized:true,
                  id: id
                },
            })
        }, (e) => {
            console.log(e);
        }) */
        history.push({
            pathname: './adminpanel',
            state: {
                authorized: true,
                id:id
            }
       })
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
                Submit
            </Button>
           
        </div>
    )
}
