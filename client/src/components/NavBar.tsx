import { HomeButton, ShareButton, Card } from './Buttons';

var bgColors = {
    "DarkBlue": "#175C9C"
};

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
            <ul style={{
                display: "flex",
                alignItems: "center",
                listStyleType: 'none'
            }}>
                <Card />
                <ShareButton />
            </ul>

        </div>

    </div >

)

export const HomeNavBar = ()=> (
<div style={{
        backgroundColor: bgColors.DarkBlue,
        width: '100%',
        height: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }}>
        <div className="divRight" style={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <ul style={{
                display: "flex",
                alignItems: "center",
                listStyleType: 'none'
            }}>
                <Card />
            </ul>
        </div>
    </div >
)