define(['backbone'], function( Backbone )
{
    var TaskModel = Backbone.Model.extend({
        defaults: {
            'assigned': '',
            'description': '',
            'title': ''
        },
        validate: function( attrs )
        {
            if ( '' == attrs.assigned || '' == attrs.description || '' == attrs.title )
            {
                return 'Not all attributes are defined';
            }
        }
    });

    return TaskModel;
});