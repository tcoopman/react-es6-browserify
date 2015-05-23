import React from 'react';

export class Body extends React.Component {
    getClassName() {
        return 'foo';
    }


    render() {
        const x = 'x';

        return (
            <div className={'${x} ${this.getClassName()} bar'}>
                Hello there!
            </div>
        );
    }
}
