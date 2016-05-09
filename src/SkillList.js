var SkillList = cc.Node.extend({
    ctor: function() {
        this._super();
        this.pos = this.getPosition();

        this.skillSlot = new Array(10);
    }
});

var Skill = cc.Sprite.extend({
    ctor: function( phase, name, description ) {
        this._super();
        this.activated = false;
        this.selectLength = 0;

        //this.initWithFile();

        var pos = this.getPosition();
        this.info = cc.cc.LabelTTF.create( phase + " " + name, 'ITC Stone Serif LT Italic', 30 );
        this.addChild( this.info );
    }
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
    select: function( dt ) {
        this.selectLength = 40;
        if ( this.activated == false ) {
            this.activated = true;
        } else {
            this.activated = false;
        }
    }

});
