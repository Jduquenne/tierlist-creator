import React from 'react';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
    <header style={{ padding: '1rem', background: '#2c3e50', color: '#ecf0f1' }}>
        <h1>{title}</h1>
    </header>
);

export default Header;