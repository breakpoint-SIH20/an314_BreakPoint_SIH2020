import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import NavBar from './components/Navbar';
import Routes from './components/Routes';
import history from './components/history';

export default function App() {
    const [session, setSession] = useState({});
    useEffect(() => {
        fetch('/auth/profile')
            .then((res) => res.json())
            .then((data) => {
                setSession(data);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
                setSession({});
            });
    }, []);

    if (session.email && !(session.location && session.userType))
        history.push('/update');
    return (
        <>
            <div style={{ textAlign: 'center', margin: 0 }}>
                <NavBar isLoggedIn={!!session.email} email={session.email} />
                <Router>
                    <Routes session={session} />
                </Router>
            </div>
        </>
    );
}
