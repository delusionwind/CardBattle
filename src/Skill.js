var Skill = cc.Sprite.extend({
    ctor: function( phase, name, description, requirements ) {
        this._super();
        this.activated = false;
        this.posY = 0;

        this.description = description;
        this.requirements = requirements;

        this.pos = this.getPosition();
        this.info = cc.LabelTTF.create( "" +phase + " " + name, 'ITC Stone Serif LT Italic', 15 );
        this.info.setPosition( new cc.Point( this.pos.x, this.pos.y ) );
        this.addChild( this.info );

        this.info2 = cc.LabelTTF.create( requirements, 'ITC Stone Serif LT Italic', 12 );
        this.info2.setPosition( new cc.Point( this.pos.x, this.pos.y - 14 ) );
        this.addChild( this.info2 );
    },

    active: function() {
        if ( this.activated == false ) {
            this.activated = true;
            this.setPosition( new cc.Point( this.pos.x + 40, this.posY ));
            this.info2.setString( this.description );
        }
    },
    deactive: function() {
        if ( this.activated == true ) {
            this.activated = false;
            this.setPosition( new cc.Point( this.pos.x, this.posY ));
            this.info2.setString( this.requirements );
        }
    }

});

Skill.PHASE = {
    MOV: "[MOV]",
    ATK: "[ATK]",
    DEF: "[DEF]"
};
