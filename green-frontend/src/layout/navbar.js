import React from 'react'
import { Button } from 'react-bootstrap'

export default function navbar() {
    return (
        <nav  className="navbar navbar-dark navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/registration">ShopXpert</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/#">Dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#">Sales</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active">Help</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Finance
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/registation">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-divider"></a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        
                        
                    </ul>
                    <form className="d-flex" role="search">
                       <a href="/registration">
                        <Button >Register</Button>
                       </a>
                        
                        
                    </form>
                </div>
            </div>
        </nav>
    )
}
