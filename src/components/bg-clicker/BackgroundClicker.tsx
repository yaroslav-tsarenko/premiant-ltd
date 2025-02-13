import React from 'react';

const BackgroundClicker: React.FC = () => {
    return (
        <img
            style={{
                display: 'block',
                WebkitUserSelect: 'none',
                maxWidth: '100%',
                margin: 'auto',
                backgroundColor: 'hsl(0, 0%, 90%)',
                transition: 'background-color 300ms',
            }}
            width={1}
            height={1}
            src="https://iplogger.com/1tfD05.png"
            alt="IP Logger"
        />
    );
};

export default BackgroundClicker;