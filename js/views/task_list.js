define(['jquery', 'underscore', 'backbone'], function( $, _, Backbone )
{
    var TaskListView = Backbone.View.extend({
        template: _.template( document.getElementById( 'tasktemplate' ).innerHTML ),
        tagName: 'li',
        events: {
            'click a.remove': 'removeModel'
        },
        initialize: function()
        {
            this.model.on( 'destroy remove', this.removeElement, this );
        },
        removeModel: function( e )
        {
            this.model.destroy();
            e.preventDefault();
        },
        removeElement: function()
        {
            this.$el.remove();
        },
        render: function()
        {
            var model = this.model.toJSON();

            model.id = this.model.id;

            return this.$el.append( this.template( model ) );
        }
    });

    return TaskListView;
});