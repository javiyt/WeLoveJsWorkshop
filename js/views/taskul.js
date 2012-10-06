define(['jquery', 'backbone', 'views/task_list'], function( $, Backbone, TaskListView )
{
    var TaskUlView = Backbone.View.extend({
        el: document.getElementById( 'tasklist' ),
        initialize: function()
        {
            this.collection.on( 'reset', this.renderAll, this );
            this.collection.on( 'add', this.render, this );
        },
        renderAll: function()
        {
            this.collection.each( function( model )
            {
                this.render( model );
            }, this );
        },
        render: function( model )
        {
            var view = new TaskListView( {model: model} );

            this.$el.append( view.render() );
        }
    });

    return TaskUlView;
});