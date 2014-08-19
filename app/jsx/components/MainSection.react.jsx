const React = require('react');
import {Body} from './Body.react.jsx';


class _MainSection {
    render() {
        return (
            <div>
                <h1>Example of React with es6 and browserify</h1>
                <Body />
            </div>
        );
    }
}
export const MainSection = React.createClass(_MainSection.prototype);
