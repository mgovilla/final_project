import React, { Component } from 'react';
import { Link } from 'react-router-dom'

var bgColors = {
    "DarkBlue": "#175C9C",
    'LightBlue': '#CAE6FF'
};

export const HomeButton = () => (
    <div className='btn' >
        <Link to={`/home`}>
            Home
        </Link>
    </div>
)

export default function Logout() {
    const loggingOut =  async() => {
        fetch("/logout").then()
        return
    }
    return (
            <button className='btn' onClick={loggingOut} style={{font: '18px "Century Gothic", Futura, sans-serif'}}>
                Log out
            </button>
    )
}


    export const NavBar = () => (
        <div style={{
            backgroundColor: bgColors.DarkBlue,
            width: '100%',
            height: '60px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <HomeButton />
            <div className="divRight" style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Logout />
            </div>
        </div >

    )

    export const HomeNavBar = () => (
        <div style={{
            backgroundColor: bgColors.DarkBlue,
            width: '100%',
            height: '60px',
        }}>
            <div style={{ float: 'right' }}>
                <Logout />
            </div>


        </div >
    )