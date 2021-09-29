import React, { useState } from 'react'
import { useLocation } from 'react-router'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import './styles/adminpanel.css'
export default function Adminpanel() {
    const [current,setCurrent] = useState("app setup") 
    const [currency, setcurrency] = useState("");
    const [signature_id, setID] = useState("");
    const [address, setAdress] = useState("");
    const [xpub, setxpub] = useState(); 
    
    const location = useLocation();
    const { id, authorized } = location.state;
    
    const wallets = {
        "currency": currency,
        "signature_id": signature_id,
        "xpub": xpub
    }
    const addresses = {
        "currency": currency,
        "signature_id": signature_id,
        "address": address
    }
    
    function handleCreateWallet() {
        axios.get(' https://wewallet.herokuapp.com/create-admin-wallet')
            .then((res) => {
                console.log('successfully created wallet');
            }, (e) => {
                console.log(e);
            });
    }
    function handleSetup() {
        axios.post('https://wewallet.herokuapp.com/admin/setup', {
            wallets: wallets
        })
        .then((res) => {
               /* 
                    structure of res.data
                    “ _id” : “ ”,
                    “currency” : “ “,
                    “signatureId”: “ ”,
                    “xpub”  : “ ” 
                */
        }, (e) => {
                console.log(e);
        });
    }
    function GenerateAddress(){
        axios.post('https://wewallet.herokuapp.com/admin/setup/accounts/bnb', {
            addresses: addresses
        })
            .then((res) => {
            /* 
                structure of res.data.
                “ _id” : “ ”,
                “currency” : “ “,
                “signatureId”: “ ”,
                “address”  : “ ” 
            */
            }, (e) => {
                console.log(e);
            });
        
            axios.post('https://wewallet.herokuapp.com/admin/setup/accounts/xrp', {
                addresses: addresses
            })
                .then((res) => {
                /* 
                    structure of res.data.
                    “ _id” : “ ”,
                    “currency” : “ “,
                    “signatureId”: “ ”,
                    “address”  : “ ” 
                */
                }, (e) => {
                    console.log(e);
                });
            
                axios.post('https://wewallet.herokuapp.com/admin/setup/accounts/xlm', {
                    addresses: addresses
                })
                    .then((res) => {
                    /* 
                        structure of res.data.
                        “ _id” : “ ”,
                        “currency” : “ “,
                        “signatureId”: “ ”,
                        “address”  : “ ” 
                    */
                    }, (e) => {
                        console.log(e);
                    });
                
        
    }
    function handlesetup() {
        return (
            <div className="c">
                
                <button onClick={handleCreateWallet}>Create new admin wallet</button>
                <div>
                    <input onChange={(e) => setcurrency(e.target.value)} placeholder="currency" ></input>
                    <input onChange={(e)=>setID(e.target.value)} placeholder="Signature ID"></input>
                    <input onChange={(e)=>{setAdress(e.target.value)}} placeholder="address"></input>
                    <input onChange={(e)=>{setxpub(e.target.value)}} placeholder="Xpub"></input>
                    <Button onClick={handleSetup} className="y">Setup new wallet</Button>
                </div>
                <Button onClick={GenerateAddress}> Generate bnb,xrp,xlm addresses </Button>
                
                <div>Address Setup</div>
                <div>All Active Wallets</div>
            </div>
        )
    }
    function handlecustodial() {
        return (
            <div className="c">
                <div>Send or Receive money</div>
                <div>Balance of all currencies</div>
                <div>Functionality for adding tokens in ecosystem</div>
                <div>display of all tokens added by admin</div>
                <div>multiple wallet functionality</div>
                <div>rewards mechanisms and settings</div>
            </div>
        )
    }
    function handleanalytics(){
        return (
            <div className="c">
                <div>Current Customer Analytics</div>
                <div>Current Currency Analytics</div>
                <div>Bug reports & community</div>
           </div>
       )
    }
    return (
        <div className="panel">  
            <div className="sidebar"> <ul>
                    <li onClick={()=>setCurrent("app setup")}>App setup</li>
                    <li onClick={()=>setCurrent("custodial")}>custodial wallet</li>
                    <li onClick={()=>setCurrent("analytics")}>Analytics</li>
                </ul>
                
            </div>
            <div className="b" >
                {current === "app setup" && handlesetup()}
                {current === "custodial" && handlecustodial()}
                {current === "analytics" && handleanalytics()}
            </div>
    </div>
    )
}
