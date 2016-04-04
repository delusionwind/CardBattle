var BattleStatus = cc.Node.extend({
    ctor: function() {
        this._super();
        this.barBackground = cc.Sprite.create( 'res/images/battleBar.jpg' );
        this.addChild( this.barBackground );
        var pos = this.getPosition();
        this.phaseLabel = cc.LabelTTF.create( "TEST PHASE", 'ITC Stone Serif LT Italic', 25 );
        this.phaseLabel.setPosition( new cc.Point( pos.x - 40, pos.y ) );
        this.addChild( this.phaseLabel );
    },

    update: function( dt ) {
        
    }
});
