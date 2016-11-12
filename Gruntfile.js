/******************************************************************
 * One Nexus
 * Grunt Setup
 * @uthor [@esr360](http://twitter.com/esr360)
 ******************************************************************/

module.exports = function(grunt) {

    // Allows the passing of multiple flags on the command line
    require('nopt-grunt-fix')(grunt);
    
    /**************************************************************
     * Config
     *************************************************************/

    /**
     * Set the default theme to compile assets for
     * @var {string} theme
     */
    var theme = grunt.option('theme') || 'One-Nexus';

    /**
     * List of all themes used by the project
     * @var {object} themes
     */
    var themes = grunt.option('themes') || [
        'default', 'One-Nexus'
    ]
    
    /**
     * Set your desired development environment
     * @var {('dev'|'prod')} [dev] env
     */
    var env = grunt.option('env') || 'dev';

    /**
     * Map the project's architecture into one Grunt can use
     * @var {object} project
     */
    var project = {
        dist:[         'app/', {
            images:    'app/images/',
            scripts:   'app/scripts/',
            styles:    'app/styles/',
            themes:[   'app/themes/', {
                theme: 'app/themes/<%=theme%>/'
            }],
            templates: 'prototype/',
        }],
        source:[       'assets/', {
            images:    'assets/images/',
            scripts:   'assets/modules/',
            styles:    'assets/modules/',
            themes:[   'assets/themes/', {
                theme: 'assets/themes/<%=theme%>/'
            }],
            templates: 'templates/',
        }],
        vendor:        'vendor/',
        docs:[         'docs/', {
            scripts:   'docs/js/',
            styles:    'docs/sass/'
        }],
        test:[         'test/', {
            scripts:   'test/js/',
            styles:    'test/sass/'
        }]
    }

    /**
     * Set which Owl-Carousel modules you would like to use
     * @see https://git.io/v6ssU
     */
    var _owl = function() {
        var owlPath = project.vendor + 'Owl-Carousel/src/js/'; 
        var owlModules = [
            owlPath + 'owl.carousel.js',
            owlPath + 'owl.animate.js',
            owlPath + 'owl.autoheight.js',
            owlPath + 'owl.autoplay.js',
            owlPath + 'owl.compiled.js',
            owlPath + 'owl.hash.js',
            owlPath + 'owl.lazyload.js',
            owlPath + 'owl.navigation.js',
            owlPath + 'owl.video.js'
        ]
        return owlModules;
    };

    /**
     * Set the scripts to be included in your theme's main js file
     * @var {object} _scripts
     */
    var _scripts = [
        _owl(),
        project.vendor + 'matchMedia/matchMedia.js',
        project.vendor + 'Synergy/dist/synergy.js',
        project.source[0] + 'modules/utilities/core/core.js',
        project.source[0] + 'tools/**/*.js',
        project.source[0] + 'modules/elements/**/*.js',
        project.source[0] + 'modules/objects/**/*.js',
        project.source[1].themes[1].theme + '<%=theme%>.js'
    ];

    /**
     * Set all global scripts to be used by the project
     * @var {object} _globalScripts
     */
    var _globalScripts = [];

    /**
     * Set all global styles to be used by the project
     * @var {object} _globalStyles
     */
    var _globalStyles = [];

    /**
     * The name of your project's compiled & distributed asset
     * @var {string} dist
     * @example
     * '/' + dist + '.css'
     */
    var dist = 'app';
    
    /**************************************************************
     * Packages
     *************************************************************/
        
    grunt.initConfig({
		
        pkg: grunt.file.readJSON('package.json'),

        // Pass the theme variable to allow it to be dynamic
        theme: theme,

        /**
         * Grunt Text Replace
         * @see https://github.com/yoniholmes/grunt-text-replace
         */
        replace: {
            sassTheme: {
                src: project.source[0] + dist + '.scss',
                overwrite: true, 
                replacements: [{
                    from: /\$theme(.*?);/g,
                    to: '$theme : \'<%=theme%>\';'
                }]
            }
        },
        
        /**
         * Clean
         * @see https://github.com/gruntjs/grunt-contrib-clean
         */
        clean: {
            dist: [
                project.dist[0] + '*', 
                '!' + project.dist[1].themes[0] + '**'
            ],
            scripts: [
                project.dist[1].themes[1].theme + '**/*.js', 
                '!' + project.dist[1].themes[1].theme + '**/*.min.js'
            ],
            styles: [
                project.dist[0] + '**/*.css', 
                '!' + project.dist[0] + '**/*.min.css'
            ],
            images: {
                src: project.dist[1].images
            },
            theme: {
                src: project.dist[1].themes[1].theme
            }
        },
        
        /**
         * Copy
         * @see https://github.com/gruntjs/grunt-contrib-copy
         */
        copy: {
            dist: {
                files: [
                    {
                        cwd: project.vendor + 'Font-Awesome/fonts',
                        src: '**/*',
                        dest: project.dist[0] + 'fonts',
                        expand: true
                    },
                    {
                        src: [_globalScripts],
                        dest: project.dist[1].scripts,
                        expand: true,
                        flatten: true
                    },
                    {
                        src: [_globalStyles],
                        dest: project.dist[1].styles,
                        expand: true,
                        flatten: true
                    }
                ]
            },
            images: {
                files: [{
                    cwd: project.source[1].images,
                    src: '**/*',
                    dest: project.dist[1].images,
                    expand: true
                }]
            }
        },

        /**
         * Sass
         * @see https://github.com/sindresorhus/grunt-sass
         */
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    [project.dist[1].themes[1].theme + dist + '.css']: 
                    project.source[0] + dist + '.scss'
                }
            },
            prod: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    [project.dist[1].themes[1].theme + dist + '.min.css']: 
                    project.source[0] + dist + '.scss'
                }
            },
            demo: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: 'demo/scss',
                    src: ['**/*.scss'],
                    dest: 'demo/css',
                    ext: '.css'
                }]
            }
        },

        /**
         * CSSMin
         * @see https://github.com/gruntjs/grunt-contrib-cssmin
         */
        cssmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: project.dist[1].themes[1].theme,
                        src: ['*.css', '!*.min.css'],
                        dest: project.dist[1].themes[1].theme,
                        ext: '.min.css'
                    },
                    {
                        expand: true,
                        cwd: project.dist[1].styles,
                        src: ['*.css', '!*.min.css'],
                        dest: project.dist[1].styles,
                        ext: '.min.css'
                    }
                ]
            }
        },

        /**
         * PostCSS
         * @see https://github.com/nDmitry/grunt-postcss
         */
        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer') ({
                        browsers: [
                            'last 2 versions', 
                            'ie >= 9'
                        ]
                    })
                ]
            },
            dist: {
                src: [
                    project.dist[1].styles + '**/*.css',
                    project.dist[1].themes[1].theme + '**/*.css'
                ]
            }
        },

        /**
         * Concat
         * @see https://github.com/gruntjs/grunt-contrib-concat
         */
        concat: {
            dist: {
                src: _scripts,
                dest: project.dist[1].scripts + dist + '.js',
            }
        },

        /**
         * Uglify
         * @see https://github.com/gruntjs/grunt-contrib-uglify
         */
        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            dist: {
                files: [{ 
                    src: project.dist[1].scripts + '*.js',
                    dest: project.dist[1].scripts,
                    expand: true,
                    flatten: true,
                    rename: function(dest, src) { 
                        return dest + '/' + src.replace('.js', '.min.js'); 
                    }
                }]
            },
            themes: {
                files: [{ 
                    src: project.dist[1].themes[1].theme + '**/*.js',
                    dest: project.dist[1].scripts,
                    expand: true,
                    flatten: true,
                    rename: function(dest, src) { 
                        return dest + '/' + src.replace('.js', '.min.js'); 
                    }
                }]
            }
        },

        /**
         * Scss Lint
         * @see https://github.com/ahmednuaman/grunt-scss-lint
         */
        scsslint: {
            source: [
                project.source[0] + '**/*.scss',
            ],
            options: {
                config: '.scss-lint.yml',
                colorizeOutput: false
            },
        },

        /**
         * JSHint
         * @see https://github.com/gruntjs/grunt-contrib-jshint
         */
        jshint: {
            source: [
                'Gruntfile.js', 
                project.source[0] + '**/*.js'
            ]
        },

        /**
         * Mocha Cli
         * @note used for Scss unit testing
         * @see https://github.com/Rowno/grunt-mocha-cli
         */
        mochacli: {
            scss: [project.test[1].styles + 'tests.js']
        },

        /**
         * SassDoc
         * @see https://github.com/SassDoc/grunt-sassdoc
         */
        sassdoc: {
            dist: {
                src: [
                    project.source[0] + '**/*.scss'
                ],
                options: {
                    dest: project.docs[1].styles
                }
            },
        },

        /**
         * JSDoc
         * @see https://github.com/SassDoc/grunt-sassdoc
         */
        jsdoc: {
            dist : {
                src: [
                    'Gruntfile.js', 
                    project.source[0] + '**/*.js'
                ],
                options: {
                    destination: project.docs[1].scripts
                }
            }
        },

        /**
         * Assemble
         * @see https://github.com/assemble/grunt-assemble
         */
        assemble: {
            options: {
                layout: 'core.hbs',
                layoutdir: project.source[1].templates + 'layouts/',
                partials: project.source[1].templates + 'partials/**/*.hbs',
                helpers: [
                    project.source[1].templates + 'helpers/**/*.js'
                ]
            },
            dist: {
                cwd: project.source[1].templates + 'pages/',
                dest: project.dist[1].templates,
                expand: true,
                src: '**/*.hbs',
                options: {
                    index: '/',
                    assets: '/',
                    environment: env,
                    theme: theme,
                    dest: '<%=assemble.dist.dest%>'
                },
            }
        },

        /**
         * Browser Sync
         * https://github.com/BrowserSync/grunt-browser-sync
         */
        browserSync: {
            bsFiles: {
                src : [
                    project.dist[1] + '**/*.css',
                    project.dist[1].templates + '**/*.html',
                    'demo/**/*.css'
                ]
            },
            options: {
                server: [
                    './' + project.dist[1].templates,
                    './' + project.dist[0],
                    './demo'
                ],
                open: false,
                watchTask: true,
                notify: false
            }
        },

        /**
         * Watch
         * @see https://github.com/gruntjs/grunt-contrib-watch
         */
        watch: {
            options: {
                spawn: false,
            },
            scss: {
                files: [
                    project.source[0] + dist + '.scss',
                    project.source[0] + '**/*.scss',
                    'demo/scss/**/*.scss'
                ],
                tasks: [ 
                    'sass:' + env, 
                    'sass:demo', 
                    'postcss',
                    //'scsslint',
                    'mochacli:scss',
                    'sassdoc',
                    'notify:css'
                ],
            },
            scripts: {
                files: _scripts,
                tasks: [
                    'concat',
                    'jshint',
                    'jsdoc',
                    'notify:scripts'
                ]
            },
            images: {
                files: project.source[1].images + '**/*',
                tasks: [
                    'clean:images',
                    'copy:images'
                ]
            },
            templates: {
                files: project.source[1].templates + '**/*',
                tasks: [
                    'assemble',
                    'notify:templates'
                ]
            }
        },

        /**
         * Notify
         * @see https://github.com/dylang/grunt-notify
         */
        notify: {
            scripts: {
                options: {
                    title: 'Scripts Compiled',
                    message: 'All scripts have been successfully compiled!'
                }
            },
            css: {
                options: {
                    title: 'Styles Compiled',
                    message: 'All styles have been successfully compiled!'
                }
            },
            templates: {
                options: {
                    title: 'Templates Compiled',
                    message: 'All templates have been successfully compiled!'
                }
            },
            dist: {
                options: {
                    title: 'App Built',
                    message: 'Your app has been successfully built!'
                }
            }
        }

    });
    
    /**************************************************************
     * Load NPM Tasks
     *************************************************************/
    
    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-sassdoc');
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('grunt-text-replace');
    
    /**************************************************************
     * Tasks
     *************************************************************/
    
    /**
     * Compile Assets
     * @param {(env|prod)} environment
     */
    var compile = function(environment) {
        var tasks = [
            'clean:dist',
            'clean:theme',
            'replace:sassTheme',
            'copy:dist',
            'copy:images',
            'concat',
            'sass:' + environment,
            'sass:demo',
            'postcss',
            'lint',
            'test',
            'assemble',
            'docs'
        ];
        if (environment == 'prod') {
            tasks.push(
                'uglify', 
                'clean:scripts',
                'cssmin',
                'clean:styles'
            );
        };
        return tasks;
    };
    
    // Default Grunt task
    grunt.registerTask('default', [
        'theme:' + theme,
        'browserSync',
        'watch'
    ]);
      
    // Compile the app
    grunt.registerTask('compile', compile(env));

    // Compile a specific theme
    grunt.registerTask('theme', function(target) {
        target = target || theme;
        grunt.config('theme', target);
        grunt.task.run('compile');
    });

    // Compile all themes
    grunt.registerTask('themes', function() {
        themes.forEach(function(theme) {
            grunt.task.run('theme:' + theme);
        });
    });
        
    // Lint
    grunt.registerTask('lint', [
        //'scsslint',
        //'jshint'
    ]);
        
    // Test
    grunt.registerTask('test', [
        'mochacli:scss'
    ]);

    // Docs
    grunt.registerTask('docs', [
        'sassdoc',
        'jsdoc'
    ]);

};