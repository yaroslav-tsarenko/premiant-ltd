import React, {FC} from 'react';
import {Helmet} from "react-helmet";

interface SEOProps {
    title: string;
    description: string;
    keywords: string;
}

const SEO: FC<SEOProps> = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>
        </Helmet>
    );
};

export default SEO;