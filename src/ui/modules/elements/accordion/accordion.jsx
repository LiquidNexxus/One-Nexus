import defaults from './accordion.json';

/**
 * Render Accordion component
 *
 * @param {String} props.name
 * @param {Array}  props.panels
 * @param {Array}  props.modifiers
 */
export default class Accordion extends React.Component {
    render() {
        return (
            <Module name={this.props.name} modifiers={this.props.modifiers}>
                {this.props.panels.map(({title, content}, index) => (
                    <Component name="section" key={index}>
                        <Component name="title" modifiers={['fizz', 'buzz']}>{title}</Component>
                        <Component name="content">{content}</Component>
                    </Component>
                ))}
            </Module>
        )
    }
}

Accordion.defaultProps = {
    name: defaults.accordion.name,
    object: true
};