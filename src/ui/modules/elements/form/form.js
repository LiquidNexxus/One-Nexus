import * as UI from '../../../ui';
import defaults from './form.json';
/**
 * Form
 * 
 * @param {Object} custom
 */
export default function form(custom) {

    const TARGET = UI.getTarget('form', defaults, custom);

    UI.Synergy(TARGET, (form, options) => {

        // exports.validate = (field, validators) => validate(field, validators);
        // exports.setState = fields => setState(fields);

    }, defaults, custom, UI.evalConfig);

    UI.config.form = UI.parse(defaults.form, custom);

    return exports;
}

/**
 * Validate a field
 * 
 * @param {*} field 
 * @param {*} validators 
 */
export function validate(field, validators) {
    if (typeof field === 'string') {
        field = document.getElementById(field);
    }

    let isValid = true;

    if (validators) validators.forEach(rule => {
        if (typeof rule === 'function') {
            if (!rule(field)) isValid = false;
        }
        else if (!rule) isValid = false;
    });

    console.log(isValid);
}

/**
 * Set field states
 * 
 * @param {*} fields 
 */
export function setState(fields) {
    fields.forEach(properties => {
        const target = document.getElementById(properties.id);

        if (properties.rules) {
            let action = 'show';

            properties.rules.forEach(rule => {
                if (typeof rule === 'function') {
                    // get field ids from stringified function
                    const ids = String(rule).match(/\(([^)]+)\)/)[1].replace(/\s/g, '').split(',');

                    let fields = [];

                    // get field from id
                    ids.forEach(field => {
                        fields.push(document.getElementById(field));
                    });

                    if (!rule(...fields)) action = 'hide';
                } 
                else if (!rule) action = 'hide';
            });

            target.style.display = (action === 'hide') ? 'none' : 'block';
        }
    });
}