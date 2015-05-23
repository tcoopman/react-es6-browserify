import React from 'react';

import {MainSection} from './components/MainSection.react.jsx';

const render = () => React.render(
    <MainSection />,
    document.getElementById('content')
);

render();
