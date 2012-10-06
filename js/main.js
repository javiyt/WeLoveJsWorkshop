requirejs.config({
    'baseUrl': 'js/',
    'paths': {
        'jquery': 'libs/jquery-1.8.2.min',
        'backbone-lib': 'libs/backbone-min',
        'backbone-debug': 'libs/backbone.debug',
        'backbone': 'libs/backbone.localStorage-min',
        'underscore': 'libs/underscore-min',
        'bootstrap': 'libs/bootstrap.min',
        'domReady': 'libs/domReady'
    },
    'shim': {
        'jquery': {
            'exports': '$'
        },
        'underscore': {
            'exports': '_'
        },
        'backbone-lib': {
            'deps': ['jquery', 'underscore']
        },
        'backbone-debug': {
            deps: ['backbone-lib']
        },
        'backbone': {
            exports: 'Backbone',
            deps: ['backbone-lib', 'backbone-debug']
        },
        'bootstrap': {
            'deps': ['jquery']
        }
    }
});

requirejs(['domReady', 'bootstrap', 'backbone', 'collections/tasks', 'views/menu', 'views/form', 'views/taskul'], function( domReady, bootstrap, Backbone, TasksCollection, MenuView, FormView, TaskUlView )
{
    domReady(function()
    {
        var AppRouter = Backbone.Router.extend({
            routes: {
                'add': 'add',
                'view': 'view',
                'edit-:task_id': 'edit',
                '*home': 'home'
            },
            views: {},
            collection: {},
            initialize: function()
            {
                this.collection = new TasksCollection();
                this.views.menu = new MenuView();
                this.views.task_list = new TaskUlView( {collection: this.collection});
                this.views.form = new FormView( {collection: this.collection} );

                this.collection.fetch();
            },
            activateSection: function( section )
            {
                this.views.menu.sectionActive( section );
            },
            home: function()
            {
                this.activateSection( 'home' );
                document.getElementById( 'add' ).style.display = 'none';
                document.getElementById( 'view' ).style.display = 'none';
                document.getElementById( 'home' ).style.display = 'block';
            },
            add: function()
            {
                this.activateSection( 'add' );
                document.getElementById( 'add' ).style.display = 'block';
                document.getElementById( 'view' ).style.display = 'none';
                document.getElementById( 'home' ).style.display = 'none';
            },
            view: function()
            {
                this.activateSection( '' );
                document.getElementById( 'add' ).style.display = 'none';
                document.getElementById( 'view' ).style.display = 'block';
                document.getElementById( 'home' ).style.display = 'none';
            },
            edit: function( task_id )
            {
                this.views.form.edit( task_id );
                this.add();
            }
        });

        new AppRouter();
        Backbone.history.start();
    });
});