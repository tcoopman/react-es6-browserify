const React = require('react');


class _Body {
    getClassName() {
        return 'foo';
    }


    render() {
        const x = 'x';

        return (
            <div className={`${x} ${this.getClassName()} bar`}>
                Hello there!
            </div>
        );
    }
}
export const Body = React.createClass(_Body.prototype);
