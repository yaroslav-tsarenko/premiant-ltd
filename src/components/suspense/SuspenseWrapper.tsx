import React, { Suspense } from 'react';

const suspense = (Component: React.ComponentType<any>) => {
    return (props: any) => (
        <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </Suspense>
    );
};

export default suspense;