define(['jquery', 'backbone', 'collections/tasks'], function( $, Backbone, TaskCollection )
{
    var FormView = Backbone.View.extend({
        el: document.getElementById( 'add' ),
        events: {
            'submit form': 'submitForm'
        },
        initialize: function()
        {
            this.collection.on( 'sync', this.resetForm, this );
            this.collection.on( 'error', this.showError, this );
        },
        showError: function( model, message )
        {
            alert( message );
        },
        resetForm: function()
        {
            $( 'input[type="text"]', this.$el ).val( '' );
        },
        submitForm: function( e )
        {
            var model = {
                'title': document.getElementById( 'title' ).value,
                'description': document.getElementById( 'description' ).value,
                'assigned': document.getElementById( 'assigned' ).value
            };

            this.collection.create( model );

            e.preventDefault();
        },
        edit: function( task_id )
        {
            var model = this.collection.get( task_id );

            document.getElementById( 'title' ).value = model.get( 'title' );
            document.getElementById( 'description' ).value = model.get( 'description' );
            document.getElementById( 'assigned' ).value = model.get( 'assigned' );
        }
    });

    return FormView;
});