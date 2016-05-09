var Skill = cc.Sprite.extend({
    ctor: function( phase, name, description ) {
        this._super();
        this.activated = false;
        this.selectLength = 0;

        //this.initWithFile( 'res/images/logo.png' );

        var pos = this.getPosition();
        this.info = cc.LabelTTF.create( "" +phase + " " + name, 'ITC Stone Serif LT Italic', 15 );
        this.info.setPosition( new cc.Point( pos.x, pos.y ) );
        this.addChild( this.info );
    },
    update: function( dt ) {
        var pos = this.getPosition();
        if ( this.activated == true ) {
            this.setPosition( new cc.Point( pos.x + this.selectLength, pos.y ) );
            this.selectLength = 0;
        } else if ( this.activated == false ) {
            this.setPosition( new cc.Point( pos.x - this.selectLength, pos.y ) );
            this.selectLength = 0;
        }

    },
    active: function( dt ) {
        this.selectLength = 40;
        if ( this.activated == false ) {
            this.activated = true;
        } else {
            this.activated = false;
        }
    }

});

Skill.PHASE = {
    MOV: "[MOV]",
    ATK: "[ATK]",
    DEF: "[DEF]"
};
