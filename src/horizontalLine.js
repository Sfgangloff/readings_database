
import React from 'react';

const Hline = (props) => (
    <hr
        style={{
            color: props.color,
            backgroundColor: props.color,
            height: 3
        }}
        className={props.className}
    />
);

export default Hline;