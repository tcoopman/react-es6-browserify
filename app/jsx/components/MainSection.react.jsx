import {MarkdownRenderer} from './Markdown.react.jsx';


class _MainSection {
    render() {
        return (
            <div>
                <h1>Example of React with es6 and browserify</h1>
                <MarkdownRenderer />
            </div>
        );
    }
}
export const MainSection = React.createClass(_MainSection.prototype);
