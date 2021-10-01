import React, { useState,useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import {
  Button,
  Form,
  Col,
  Row,
  Dropdown,
  DropdownButton,
  Table,
} from "react-bootstrap";
import "./styles/adminpanel.css";
export default function Adminpanel() {
  const [current, setCurrent] = useState("app setup");
  const [currency, setcurrency] = useState("");
  const [signature_id, setID] = useState("");
  const [address, setAdress] = useState("");
  const [xpub, setxpub] = useState();
  const [g, setg] = useState(true);
  const location = useLocation();
  const [symbols, setsymbols] = useState();
  const [contact, setcontact] = useState();
  const [decimal, setdecimal] = useState();
  const [description, setdescription] = useState();
  const [type, setType] = useState("ETH");
  const [live, setlive] = useState(true);

  
  let key2 = 4;
  let live_data = [
    {
    
      basePair: "USD",
      source: "CoinGecko",
      timestamp: 1631543440232,
      value: "3146.17360464",
      id: "ETH",
    },
    {
     
      basePair: "USD",
      source: "CoinGecko",
      timestamp: 1631543440232,
      value: "3146.17360464",
      id: "ETH",
    },
    {
      
      basePair: "USD",
      source: "CoinGecko",
      timestamp: 1631543440232,
      value: "3146.17360464",
      id: "ETH",
    }
  ];

  useEffect(() => {
           
    axios.get("https://wewallet.herokuapp.com/live-data")
      .then((res) => {
        console.log(live_data);
        console.log(res.data);
        res.data.map((s) => {
          live_data.push({
        
            basePair: s.basePair,
            source: s.source,
            timestamp: s.timestamp,
            value: s.value,
            id: s.id,
          });
          key2++; 
        });
        /*  console.log(live_data); */
        console.log(live_data);
        console.log("successfully fetched");
      },
      (e) => {
        console.log(e);
      }
    );
  },);
 



  const { id, authorized } = location.state;

  const wallets = {
    currency: currency,
    signature_id: signature_id,
    xpub: xpub,
  };
  const addresses = {
    currency: currency,
    signature_id: signature_id,
    address: address,
  };

  function handleCreateWallet() {
    axios.get("https://wewallet.herokuapp.com/create-admin-wallet").then(
      (res) => {
        console.log("successfully created wallet");
      },
      (e) => {
        console.log(e);
      }
    );
  }

  function handleSetup() {
    axios
      .post("https://wewallet.herokuapp.com/admin/setup", {
        wallets: wallets,
      })
      .then(
        (res) => {
          /* 
                              structure of res.data
                              “ _id” : “ ”,
                              “currency” : “ “,
                              “signatureId”: “ ”,
                              “xpub”  : “ ” 
                          */
        },
        (e) => {
          console.log(e);
        }
      );
  }

  function GenerateAddress() {
    axios
      .post("https://wewallet.herokuapp.com/admin/setup/accounts/bnb", {
        addresses: addresses,
      })
      .then(
        (res) => {
          /* 
                          structure of res.data.
                          “ _id” : “ ”,
                          “currency” : “ “,
                          “signatureId”: “ ”,
                          “address”  : “ ” 
                      */
        },
        (e) => {
          console.log(e);
        }
      );

    axios
      .post("https://wewallet.herokuapp.com/admin/setup/accounts/xrp", {
        addresses: addresses,
      })
      .then(
        (res) => {
          /* 
                              structure of res.data.
                              “ _id” : “ ”,
                              “currency” : “ “,
                              “signatureId”: “ ”,
                              “address”  : “ ” 
                          */
        },
        (e) => {
          console.log(e);
        }
      );

    axios
      .post("https://wewallet.herokuapp.com/admin/setup/accounts/xlm", {
        addresses: addresses,
      })
      .then(
        (res) => {
          /* 
                                  structure of res.data.
                                  “ _id” : “ ”,
                                  “currency” : “ “,
                                  “signatureId”: “ ”,
                                  “address”  : “ ” 
                              */
        },
        (e) => {
          console.log(e);
        }
      );
  }
  const [setup, setSetup] = useState(false);

  function handlesetup() {
    return (
      <div className="c">
        <h3 className="k"> App Setup </h3>{" "}
        <div className="wrap">
          <div className="d">
            <Row>
            <Col>
            
              <Button
                onClick={() => setSetup(!setup)}
                variant="dark"
                className="y"
              >
                Setup new wallet{" "}
              </Button>{" "}
              {setup && (
                <Form className="ggs" onSubmit={handleSetup}>
                  <Row>
                    <Col>
                      <Form.Control
                        onChange={(e) => setcurrency(e.target.value)}
                        placeholder="currency"
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Form.Control
                        onChange={(e) => setID(e.target.value)}
                        placeholder="Signature ID"
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Form.Control
                        onChange={(e) => setcurrency(e.target.value)}
                        placeholder="currency"
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Button type="submit" variant="primary" className="sbtr">
                    setup
                  </Button>
                </Form>
              )}{" "}
                
            </Col>
              
        
          <Col>
          <Button onClick={GenerateAddress} variant="dark">
            {" "}
            Setup bnb, xrp, xlm addresses{" "}
          </Button>
          </Col>
          </Row>
        </div>{" "}
        </div>
      </div>
    );
  }

  function handleSubmit() {
    axios
      .post("https://wewallet.herokuapp.com/admin/add-custom-token" + type, {
        symbol: symbols,
        constact_address: contact,
        decimals: decimal,
        description: description,
      })
      .then(
        (res) => {
          /* 
                                                                                                          res.data:
                                                                            
                                                                                                          "currency": "ASE",
                                                                                                          "signatureId": "d71e9dbc-b7cf-438d-81f9-05baa0d1fab4"
                                                                                                          "derivationKey": 46,
                                                                                                          "id": "613f61fc7baf3d9c555032a8",
                                                                                                          "address": "0xbafcf676da75ff0c4af30569f97849de0ecbd597"
                                                                                                      }
                                                                                                  */
        },
        (e) => {
          console.log(e);
        }
      );
  }
  const [send, setsend] = useState(true);
  const [receive, setreceive] = useState(true);
  const [type2, setType2] = useState("ETH");
  const [amount, setAmount] = useState(0);
  const [balance, setbalance] = useState(true);

  function handleSendMoney() {
    axios
      .get("https://wewallet.herokuapp.com/admin/send/" + type2, {
        address: type2,
        amount: amount,
      })
      .then(
        (res) => {
          console.log("sent successfully");
        },
        (e) => {
          console.log(e);
        }
      );
  }

  function handleReceiveMoney() {
    axios
      .get("https://wewallet.herokuapp.com/admin/receive/" + type2, {
        address: type2,
        amount: amount,
      })
      .then(
        (res) => {
          console.log("sent successfully");
        },
        (e) => {
          console.log(e);
        }
      );
  }
  let key = 3;
  let balance_arr = [
    {
      key: 1,
      currency: "ADA",
      balance: "10k",
      accountBalance: "100k",
      availableBalance: "200k",
    },
    {
      key: 2,
      currency: "XLR",
      balance: "11k",
      accountBalance: "70k",
      availableBalance: "160k",
    },
    {
      key: 3,
      currency: "ADA",
      balance: "10k",
      accountBalance: "100k",
      availableBalance: "200k",
    }
  ];

  function getBalance() {
    axios.get("https://wewallet.herokuapp.com/balance/all").then(
      (res) => {
        res.data.map((ob) => {
          balance_arr.push({
            key: key,
            currency: ob.currency,
            balance: ob.balance,
            accountBalance: ob.accountBalance,
            availableBalance: ob.availableBalance,
          });
          key++;
        });
        setbalance(true);
        console.log("balance successfully added");
      },
      (e) => {
        console.log(e);
      }
    );
    setbalance(true);
  }


 

 
  

  function handlecustodial() {
    return (
      <div className="c">
        <h3 className="k"> Custodial Wallet </h3>{" "}
        <div className="wrap">
          <Row className="rw">
            <Col>
              <div className="d">
                Balance of all currencies{" "}
                <Button variant="dark" className="rp" onClick={getBalance}>
                  Fetch balance of all currencies{" "}
                </Button>{" "}
                {balance && (
                  <Table striped bordered hover variant="dark" className="gp">
                    <thead>
                      <tr>
                        <th> # </th> <th> Currency </th> <th> Balance </th>{" "}
                        <th> Account Balance </th> <th> Available Balance </th>{" "}
                      </tr>{" "}
                    </thead>{" "}
                    <tbody>
                      {" "}
                      {balance_arr.map((s) => {
                        return (
                          <tr>
                            <td> {s.key} </td> <td> {s.currency} </td>{" "}
                            <td> {s.balance} </td> <td> {s.accountBalance} </td>{" "}
                            <td> {s.availableBalance} </td>{" "}
                          </tr>
                        );
                      })}{" "}
                    </tbody>{" "}
                  </Table>
                )}{" "}
              </div>
            </Col>
            <Col>
              <div className="d">
                display of all tokens added by admin{" "}
                <Button className="rp" variant="dark">
                  {" "}
                  Display Live Data{" "}
                </Button>{" "}
                {live && (
                  <Table striped bordered hover variant="dark" className="gp">
                    <thead>
                      <tr>
                        <th> # </th> <th> basePair </th> <th> source </th>{" "}
                        <th> timestamp </th> <th> value </th> <th> id </th>{" "}
                      </tr>{" "}
                    </thead>{" "}
                    <tbody>
                      {" "}
                      {live_data.map((s) => {
                        return (
                          <tr>
                            <td> </td> <td> {s.basePair} </td>{" "}
                            <td> {s.source} </td> <td> {s.timestamp} </td>{" "}
                            <td> {s.value} </td> <td> {s.id} </td>{" "}
                          </tr>
                        );
                      })}{" "}
                    </tbody>{" "}
                  </Table>
                )}{" "}
              </div>
            </Col>
          </Row>
          <Row className="rw">
            <Col>
              <div className="d">
                Send or Receive money{" "}
                <Row>
                  <Col>
                    <Button
                      variant="dark"
                      className="rp"
                      onClick={() => setsend(true)}
                    >
                      send{" "}
                    </Button>{" "}
                    {send && (
                      <Form className="ggs" onSubmit={handleSendMoney}>
                        <Row>
                          <Col>
                            <Form.Control
                              placeholder="Amount"
                              onChange={(e) => setAmount(e.target.value)}
                            />{" "}
                          </Col>{" "}
                          <Col>
                            <DropdownButton
                              id="dropdown-basic-button"
                              title={type2}
                              variant="dark"
                              className="btdr"
                            >
                              <Dropdown.Item onClick={() => setType2("ETH")}>
                                ETH{" "}
                              </Dropdown.Item>{" "}
                              <Dropdown.Item onClick={() => setType2("TRON")}>
                                TRON{" "}
                              </Dropdown.Item>{" "}
                              <Dropdown.Item onClick={() => setType2("ONE")}>
                                ONE{" "}
                              </Dropdown.Item>{" "}
                              <Dropdown.Item onClick={() => setType2("BSC")}>
                                BSC{" "}
                              </Dropdown.Item>{" "}
                            </DropdownButton>{" "}
                          </Col>{" "}
                        </Row>
                        <Button variant="info" type="submit" className="sbtr">
                          Send{" "}
                        </Button>{" "}
                      </Form>
                    )}{" "}
                  </Col>
                  <Col>
                    <div>
                      <Button
                        variant="dark"
                        className="rp"
                        onClick={() => setreceive(true)}
                      >
                        receive{" "}
                      </Button>{" "}
                      {receive && (
                        <Form className="ggs" onSubmit={handleReceiveMoney}>
                          <Row>
                            <Col>
                              <Form.Control
                                placeholder="Amount"
                                onChange={(e) => setAmount(e.target.value)}
                              />{" "}
                            </Col>{" "}
                            <Col>
                              <DropdownButton
                                id="dropdown-basic-button"
                                title={type2}
                                variant="dark"
                                className="btdr"
                              >
                                <Dropdown.Item onClick={() => setType2("ETH")}>
                                  ETH{" "}
                                </Dropdown.Item>{" "}
                                <Dropdown.Item onClick={() => setType2("TRON")}>
                                  TRON{" "}
                                </Dropdown.Item>{" "}
                                <Dropdown.Item onClick={() => setType2("ONE")}>
                                  ONE{" "}
                                </Dropdown.Item>{" "}
                                <Dropdown.Item onClick={() => setType2("BSC")}>
                                  BSC{" "}
                                </Dropdown.Item>{" "}
                              </DropdownButton>{" "}
                            </Col>{" "}
                          </Row>
                          <Button variant="info" type="submit" className="sbtr">
                            Receive{" "}
                          </Button>{" "}
                        </Form>
                      )}{" "}
                    </div>{" "}
                  </Col>
                </Row>
              </div>
            </Col>
            <Col>
              <div className="d">
                Functionality for adding tokens in ecosystem{" "}
                <Button
                  variant="dark"
                  className="rp"
                  onClick={() => setg(true)}
                >
                  Add Custom token{" "}
                </Button>{" "}
                {g && (
                  <div>
                    <Form className="gg" onSubmit={handleSubmit}>
                      <Row>
                        <Col>
                          <Form.Control
                            placeholder="symbol"
                            onChange={(e) => setsymbols(e.target.value)}
                          />{" "}
                        </Col>{" "}
                        <Col>
                          <Form.Control
                            placeholder="contact address"
                            onChange={(e) => setcontact(e.target.value)}
                          />{" "}
                        </Col>{" "}
                      </Row>{" "}
                      <Row>
                        <Col>
                          <Form.Control
                            placeholder="decimals"
                            onChange={(e) => setdecimal(e.target.value)}
                          />{" "}
                        </Col>{" "}
                        <Col>
                          <Form.Control
                            placeholder="description"
                            onChange={(e) => setdescription(e.target.value)}
                          />{" "}
                        </Col>{" "}
                      </Row>{" "}
                      <Row>
                        <Col> Select address: </Col>{" "}
                        <Col>
                          <DropdownButton
                            id="dropdown-basic-button"
                            title={type}
                            variant="dark"
                            className="btdr"
                          >
                            <Dropdown.Item onClick={() => setType("ETH")}>
                              ETH{" "}
                            </Dropdown.Item>{" "}
                            <Dropdown.Item onClick={() => setType("TRON")}>
                              TRON{" "}
                            </Dropdown.Item>{" "}
                            <Dropdown.Item onClick={() => setType("ONE")}>
                              ONE{" "}
                            </Dropdown.Item>{" "}
                            <Dropdown.Item onClick={() => setType("BSC")}>
                              BSC{" "}
                            </Dropdown.Item>{" "}
                          </DropdownButton>{" "}
                        </Col>{" "}
                      </Row>{" "}
                      <Button variant="info" type="submit" className="sbtr">
                        Add{" "}
                      </Button>{" "}
                    </Form>{" "}
                  </div>
                )}{" "}
              </div>{" "}
            </Col>
          </Row>
        </div>{" "}
        {/* <div className="d">multiple wallet functionality</div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <div className="d">rewards mechanisms and settings</div> */}{" "}
      </div>
    );
  }
  const [analytic, setAnalytic] = useState(false);
  var analytics_data = [
    {
      key: 1,
      Account_Number: "ABCX109YT789",
      currency: "XLR",
      Balance: "10k",
      Loan: "80k",
      Duration: "3 years",
    },
  ];

  function bringAnalytics() {
    axios.post("https://wewallet.herokuapp.com/analytics").then(
      (res) => {
        /* map throught data and push them in analytics data */
        console.log("successfully fetched data");
      },
      (e) => {
        console.log(e);
      }
    );
    setAnalytic(!analytic);
  }

  function handleanalytics() {
    return (
      <div className="c">
        <div className="wrap">
          <h3 className="k">Analytics</h3>
          <div className="d">
            <div>
              <Button variant="dark" onClick={bringAnalytics}>
                {" "}
                Get Analytics{" "}
              </Button>
              {analytic && (
                <Table striped bordered hover variant="dark" className="gp">
                  <thead>
                    <tr>
                      <th> # </th> <th> Account_Number </th> <th> Currency </th>{" "}
                      <th> Balance </th> <th> Loan </th> <th> Duration </th>{" "}
                    </tr>{" "}
                  </thead>{" "}
                  <tbody>
                    {" "}
                    {analytics_data.map((s) => {
                      return (
                        <tr>
                          <td> {s.key} </td> <td> {s.Account_Number} </td>{" "}
                          <td> {s.currency} </td> <td> {s.Balance} </td>{" "}
                          <td> {s.Loan} </td> <td> {s.Duration} </td>{" "}
                        </tr>
                      );
                    })}{" "}
                  </tbody>{" "}
                </Table>
              )}
            </div>
          </div>{" "}
          {/* <div> Current Currency Analytics </div>{" "}
            <div> Bug reports & community </div>{" "} */}
        </div>
      </div>
    );
  }
  return (
    <div className="panel">
      <div className="sidebar">
        {" "}
        <ul className="list">
          <li>
            {" "}
            <Button
              variant="secondary"
              className="btsd"
              onClick={() => setCurrent("app setup")}
            >
              {" "}
              App setup{" "}
            </Button>{" "}
          </li>{" "}
          <li>
            <Button
              variant="secondary"
              className="btsd"
              onClick={() => setCurrent("custodial")}
            >
              {" "}
              custodial wallet
            </Button>{" "}
          </li>{" "}
          <li>
            <Button
              variant="secondary"
              className="btsd"
              onClick={() => setCurrent("analytics")}
            >
              {" "}
              Analytics
            </Button>{" "}
          </li>{" "}
        </ul>{" "}
      </div>{" "}
      <div className="b">
        {" "}
        {current === "app setup" && handlesetup()}{" "}
        {current === "custodial" && handlecustodial()}{" "}
        {current === "analytics" && handleanalytics()}{" "}
      </div>{" "}
    </div>
  );
}
