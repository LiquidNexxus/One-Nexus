import * as UI from '../../../ui';
import defaults from './accordion.json';
/**
 * Accordion
 * 
 * @param {Object} custom
 */
export default function accordion(custom) {

    const TARGET = UI.getTarget('accordion', defaults, custom);
    const methods = { toggle };

    UI.Synergy(TARGET, (accordion, options) => {

        if (!(custom instanceof HTMLElement) && accordion.length) {
            accordion.component('section', section => {
                if (section.modifier('active')) {
                    section.component('content', content => content.modifier('active', 'set'));
                }

                section.component('title', title => title.addEventListener('click', () => {
                    var active = section.modifier('active', 'isset');
                
                    toggle(section, active ? 'close' : 'open', accordion, options);
                }, false));
            });
        }

        methods.open = target => toggle(target, 'open', UI.Synergy(TARGET).query, options);
        methods.close = target => toggle(target, 'close', UI.Synergy(TARGET).query, options);
        methods.toggle = target => toggle(target, false, UI.Synergy(TARGET).query, options);

    }, defaults, custom, UI.evalConfig);

    UI.config.accordion = UI.parse(defaults.accordion, custom);

    return methods;
}

/**
 * Toggle an accordion section
 * 
 * @param {(String|Number|HTMLElement|NodeList)} target
 * @param {('open'|'close')} type
 * @param {HTMLElement} parent
 * @param {Object} options
 */
export function toggle(target, type, parent, options = defaults, keepOpen = false) {
    let section, operator;

    if (parent instanceof NodeList) {
        return parent.forEach(child => toggle(target, type, child, options, keepOpen));
    }

    // merge passed options with window options
    options = UI.deepextend(options, UI.get().config('accordion'));

    options.keepOpen = (options.keepOpen === true) ? true : false;

    // determine target accordion section
    if (typeof target === 'object' && ('target' in target)) {
        target.target.parents().reverse().forEach(parent => {
            if (parent.component('section') === true) {
                return target = parent;
            }
        });
    }

    parent = parent || target.closest('[data-module]');

    if (typeof target === 'string') {
        section = parent.querySelectorAll(target);
    } else if (typeof target === 'number') {
        section = parent.children[target - 1];
    } else if (target instanceof HTMLElement || target instanceof NodeList) {
        section = target;
    } else if (!target) {
        section = parent.component('section');
    }

    if (!section) return;

    if (section.constructor === Array) {
        return section.forEach(section => toggle(section, type, parent, options, true));
    }

    if (type) {
        operator = (type === 'open') ? 'set' : 'unset';
    } else {
        operator = section.modifier('active') === true ? 'unset' : 'set';
    }

    // close sibling sections
    if (operator === 'set' && (parent.modifier(options.keepOpenModifier) !== true) && keepOpen === false) {
        parent.component('section').forEach(el => el.modifier('active', 'unset'));
    }

    if (section instanceof NodeList || section instanceof Array) {
        section.forEach(el => el.modifier('active', operator));
    } else {
        section.modifier('active', operator);
    }

    return parent;
}