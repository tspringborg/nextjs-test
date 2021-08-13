import React from 'react'

export interface IproductProps {
}

const defaultProps: Partial<IproductProps> = {};

const product: React.FC<IproductProps> = (props) => {
    props = {...defaultProps, ...props};
    return (
        <div>
            <h1>product</h1>
        </div>
    )
}

export default product
