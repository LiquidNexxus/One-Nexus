import defaults from './assets/config.js';
import interactions from './assets/interactions.js';
import layout from './assets/layout.jss';

/**
 * Render Accordion module
 *
 * @prop {Array} panels
 */
const Accordion = ({ panels, toggle, ...props }) => (
    <Module {...props}>
        {panels.map(({ title, content, active }, index) => (
            <Component active={active} name='panel' key={index}>
                <Component name='title' tag='div' onClick={toggle}>
                    <Component name='toggle' className='fa fa-chevron-circle-down' /> {title}
                </Component>

                <Component name='content'>{content}</Component>
            </Component>
        ))}
    </Module>
);

export default Object.assign(Accordion, {
    ...interactions, layout, defaults, defaultProps: {
        name: 'Accordion',
        object: true,
    }
});