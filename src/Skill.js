var Skill = cc.Sprite.extend({
    ctor: function( phase, name, description, requirements ) {
        this._super();
        this.activated = false;
        this.selectLength = 0;

        this.description = description;
        this.requirements = requirements;

        var pos = this.getPosition();
        this.info = cc.LabelTTF.create( "" +phase + " " + name, 'ITC Stone Serif LT Italic', 15 );
        this.info.setPosition( new cc.Point( pos.x, pos.y ) );
        this.addChild( this.info );

        this.info2 = cc.LabelTTF.create( requirements, 'ITC Stone Serif LT Italic', 12 );
        this.info2.setPosition( new cc.Point( pos.x, pos.y - 14 ) );
        this.addChild( this.info2 );
    },
    update: function( dt ) {
        var pos = this.getPosition();
        if ( this.activated == true ) {
            this.setPosition( new cc.Point( pos.x + this.selectLength, pos.y ) );
            this.info2.setString( this.description );
            this.selectLength = 0;
        } else if ( this.activated == false ) {
            this.setPosition( new cc.Point( pos.x - this.selectLength, pos.y ) );
            this.info2.setString( this.requirements );
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
