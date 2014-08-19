const React = require('react');
import {MainSection} from './components/MainSection.react.jsx';

const render = () => React.renderComponent(
    <MainSection />,
    document.getElementById('content')
);

render();
