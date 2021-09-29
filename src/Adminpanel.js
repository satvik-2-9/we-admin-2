import React, { useState } from 'react'
import { useLocation } from 'react-router'
import axios from 'axios'
import { Button,Form,Col,Row,Dropdown,DropdownButton,Table } from 'react-bootstrap'
import './styles/adminpanel.css'
export default function Adminpanel() {
    const [current,setCurrent] = useState("app setup") 
    const [currency, setcurrency] = useState("");
    const [signature_id, setID] = useState("");
    const [address, setAdress] = useState("");
    const [xpub, setxpub] = useState(); 
    const [g, setg] = useState(false); 
    const location = useLocation();
    const [symbols, setsymbols] = useState();
    const [contact, setcontact] = useState();
    const [decimal, setdecimal] = useState();
    const [description, setdescription] = useState();
    const [type, setType] = useState("ETH"); 
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
    
    function handleSubmit() { 
        
        axios.post('https://wewallet.herokuapp.com/admin/add-custom-token' + type, {
            symbol: symbols,
            constact_address: contact,
            decimals: decimal,
            description:description
        }).then(res => {
            /* 
                    res.data:

                    "currency": "ASE",
                    "signatureId": "d71e9dbc-b7cf-438d-81f9-05baa0d1fab4"
                    "derivationKey": 46,
                    "id": "613f61fc7baf3d9c555032a8",
                    "address": "0xbafcf676da75ff0c4af30569f97849de0ecbd597"
                }
            */        
        }, (e) => {
            console.log(e);
        })
    }
    const [send, setsend] = useState(false);
    const [receive, setreceive] = useState(false);
    const [type2, setType2] = useState("ETH");
    const [amount, setAmount] = useState(0);
    const [balance, setbalance] = useState(false); 
    function handleSendMoney() {
        axios.get('https://wewallet.herokuapp.com/admin/send/' + type2, {
            address: type2,
            amount: amount
        }).then((res) => {
            console.log('sent successfully');
        }, (e) => {
            console.log(e);
        })
    }
    
    function handleReceiveMoney() {
        axios.get('https://wewallet.herokuapp.com/admin/receive/' + type2, {
            address: type2,
            amount: amount
        }).then((res) => {
            console.log('sent successfully');
        }, (e) => {
            console.log(e);
        })
    }
    let key = 3;
    let balance_arr = [
        {
            "key":1,
            "currency": "ADA",
            "balance": "10k",
            "accountBalance": "100k",
            "availableBalance":"200k"
        },
        {
            "key":2,
            "currency": "XLR",
            "balance": "11k",
            "accountBalance": "70k",
            "availableBalance":"160k"
        }
    ]
    function getBalance() {
        axios.get('https://wewallet.herokuapp.com/admin/balance/all')
            .then((res) => {
                res.data.map((ob) => {
                    balance_arr.push({
                        "key": key,
                        "currency": ob.currency,
                        "balance": ob.balance,
                        "accountBalance": ob.accountBalance,
                        "availableBalance": ob.availableBalance
                    });
                    key++;
                });
                setbalance(true);
                console.log("balance successfully added");
            }, (e) => {
                console.log(e);
            });
            setbalance(!balance); 
    }
    
    const [live, setlive] = useState(false);
    let key2 = 2; 
    let live_data = [
        {
            "key":1,
            "basePair": "USD",
            "source": "CoinGecko",
            "timestamp": 1631543440232,
            "value": "3146.17360464",
            "id": "ETH"
        }
    ]
    function BringLive() {
        axios.get('/https://wewallet.herokuapp.com/admin/live-data')
            .then((res) => {
                res.data.map((s) => {
                    live_data.push({
                        "key":key2,
                        "basePair": s.basePair,
                        "source": s.source,
                        "timestamp": s.timestamp,
                        "value": s.value,
                        "id": s.id
                    });
                });
                console.log('successfully fetched');
            }, (e) => {
                console.log(e);
            });
        setlive(!live); 
    }

    function handlecustodial() {
        return (
            <div className="c">
                <h3>Custodial Wallet</h3>
                <div className="d">Send or Receive money
                    <div>
                        <Button variant="dark" className="rp" onClick={() => setsend(!send)}>send</Button>
                        {send &&
                            <Form className="ggs" onSubmit={handleSendMoney}>
                            <Row>
                                <Col>
                                <Form.Control placeholder="Amount" onChange={(e)=>setAmount(e.target.value)} />
                                </Col>
                                <Col>
                                <DropdownButton id="dropdown-basic-button" title={type2} variant="dark" className="btdr">
                                        <Dropdown.Item onClick={()=>setType2("ETH")}>ETH</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>setType2("TRON")}>TRON</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>setType2("ONE")}>ONE</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>setType2("BSC")}>BSC</Dropdown.Item>
                                </DropdownButton>
                             </Col>
                            </Row>

                            <Button variant="primary" type="submit" className="sbtr">send</Button>
                         </Form>
                        }
                    </div>
                    <div>
                        <Button variant="dark" className="rp" onClick={() => setreceive(!receive)}>receive</Button>
                        {receive &&
                            <Form className="ggs" onSubmit={handleReceiveMoney}>
                            <Row>
                                <Col>
                                <Form.Control placeholder="Amount" onChange={(e)=>setAmount(e.target.value)} />
                                </Col>
                                <Col>
                                <DropdownButton id="dropdown-basic-button" title={type2} variant="dark" className="btdr">
                                        <Dropdown.Item onClick={()=>setType2("ETH")}>ETH</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>setType2("TRON")}>TRON</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>setType2("ONE")}>ONE</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>setType2("BSC")}>BSC</Dropdown.Item>
                                </DropdownButton>
                             </Col>
                            </Row>

                            <Button variant="primary" type="submit" className="sbtr">send</Button>
                         </Form>
                        }
                    
                    </div>
                </div>
                <div className="d">Balance of all currencies
                    <Button variant="dark" className="rp" onClick={getBalance}>Fetch balance of all currencies</Button>
                    {balance && 
                    <Table striped bordered hover variant="dark" className="gp">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Currency</th>
                            <th>Balance</th>
                            <th>Account Balance</th>
                            <th>Available Balance </th>
                            </tr>
                            </thead>
                        <tbody>
                            {balance_arr.map((s) => {
                                return (
                                    <tr>
                                        <td>{s.key}</td>
                                        <td>{s.currency}</td>
                                        <td>{s.balance}</td>
                                        <td>{s.accountBalance}</td>
                                        <td>{s.availableBalance}</td>
                                   </tr>
                               )
                           })}   
                        </tbody>
                     </Table>     
                    
                     }
                </div>
                <div className="d">Functionality for adding tokens in ecosystem

                    <Button variant="dark" className="rp" onClick={() => setg(!g)}>Add Custom token</Button>
                    {g && <div>

                        <Form className="gg" onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                <Form.Control placeholder="symbol" onChange={(e)=>setsymbols(e.target.value)} />
                                </Col>
                                <Col>
                                <Form.Control placeholder="contact address" onChange={(e)=>setcontact(e.target.value)} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <Form.Control placeholder="decimals" onChange={(e)=>setdecimal(e.target.value)} />
                                </Col>
                                <Col>
                                <Form.Control placeholder="description" onChange={(e)=>setdescription(e.target.value)} />
                                </Col>
                            </Row>
                            <Row>
                                <Col> Select address: </Col>
                                <Col>
                                <DropdownButton id="dropdown-basic-button" title={type} variant="dark" className="btdr">
                                        <Dropdown.Item onClick={()=>setType("ETH")}>ETH</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>setType("TRON")}>TRON</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>setType("ONE")}>ONE</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>setType("BSC")}>BSC</Dropdown.Item>
                                </DropdownButton>
                                </Col>
                            </Row>
                            <Button variant="primary" type="submit" className="sbtr">Submit</Button>
                        </Form>

                        
                    </div>}
                    
                </div>
                <div className="d">display of all tokens added by admin
                    <Button className="rp" variant="dark" onClick={BringLive}> Display Live Data </Button>
                    {live && 
                        <Table striped bordered hover variant="dark" className="gp">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>basePair</th>
                            <th>source</th>
                            <th>timestamp</th>
                            <th>value </th>
                            <th>id</th>
                            </tr>
                            </thead>
                        <tbody>
                            {live_data.map((s) => {
                                return (
                                    <tr>
                                        <td>{s.key}</td>
                                        <td>{s.basePair}</td>
                                        <td>{s.source}</td>
                                        <td>{s.timestamp}</td>
                                        <td>{s.value}</td>
                                        <td>{s.id}</td>
                                   </tr>
                               )
                           })}   
                        </tbody>
                     </Table>     
                    }
                </div>
                {/* <div className="d">multiple wallet functionality</div>
                <div className="d">rewards mechanisms and settings</div> */}
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
