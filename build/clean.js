/**
 * Compile app/theme
 * 
 * @example clean({
 *     theme: 'one-nexus', 
 *     assets: ['scss']
 * });
 */
module.exports = function clean(custom) {

    const options = Object.assign({
        environment: 'dev',
        theme: 'one-nexus',
        clean: [
            'app'
        ],
        assets: [
            'styles', 
            'scripts', 
            'images'
        ],
        nuke: false
    }, custom);

    if (options.nuke) {
        return ['clean:dist'];
    }

    const envToClean = (options.environment === 'dev') ? 'prod' : 'dev';

    let tasks = [];

    // Clean app assets
    if (options.clean.includes('app')) {
        if (options.assets.includes('styles')) {
            tasks.push(`clean:${envToClean}Styles`);
        }

        if (options.assets.includes('scripts')) {
            tasks.push(`clean:${envToClean}Scripts`);
        }

        if (options.assets.includes('images')) {
            tasks.push(`clean:images`);
        }
    }

    return tasks;
}