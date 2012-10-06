define(['jquery', 'backbone'], function( $, Backbone )
{
    var MenuView = Backbone.View.extend({
        el: document.getElementById( 'menu' ),
        sectionActive: function( section )
        {
            this.$el.find( 'li' ).removeClass( 'active' );
            this.$el.find( 'a[href="#' + section + '"]' ).parent().addClass( 'active' );
        }
    });

    return MenuView;
});