var BattleStatus = cc.Node.extend({
    ctor: function() {
        this._super();
        this.barBackground = cc.Sprite.create( 'res/images/battleBar.jpg' );
        this.addChild( this.barBackground );
        var pos = this.getPosition();
        this.phaseLabel = cc.LabelTTF.create( "DRAW PHASE", 'ITC Stone Serif LT Italic', 25 );
        this.phaseLabel.setPosition( new cc.Point( pos.x - 40, pos.y ) );
        this.addChild( this.phaseLabel );
    },

    update: function( dt ) {

    },

    changePhase: function( phase ) {
        if ( phase == 1 ) {
            this.phaseLabel.setString( "DRAW PHASE" );
        } else if ( phase == 2 ) {
            this.phaseLabel.setString( "MOVE PHASE" );
        } else if ( phase == 3 ) {
            this.phaseLabel.setString( "ATTACK PHASE" );
        } else if ( phase == 4 ) {
            this.phaseLabel.setString( "DEFENSE PHASE" );
        }
    }
});
