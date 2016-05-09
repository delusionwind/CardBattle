var SkillList = cc.Node.extend({
    ctor: function() {
        this._super();
        this.name = "";
        var pos = this.getPosition();

        this.label = new cc.LabelTTF.create( "SKILLS", 'ITC Stone Serif LT Italic', 30 );
        this.label.setPosition( new cc.Point ( pos.x, pos.y ) );
        this.addChild( this.label );

        this.slot = new Array(10);
        this.slot[0] = new Skill( "[MOV]", "Lightning FLASH", "SPEED+20" );
        this.slot[1] = new Skill( "[ATK]", "Flame BLAST    ", "FIRE+8" );
        this.slot[2] = new Skill( "[ATK]", "Stone PILLAR   ", "ROCK+8" );
        this.slot[3] = new Skill( "[ATK]", "Thunder BOLT   ", "THUNDER+4" );
        this.slot[4] = new Skill( "[ATK]", "Dark VOID      ", "ASTRAL+10" );
        this.slot[5] = new Skill( "[DEF]", "Ice WALL       ", "ICE+5,ROCK+3" );
        this.slot[6] = new Skill( "[DEF]", "Dark MATTER    ", "FIRE+6,ICE+6,THUNDER+6,ROCK+6," );

        for( var i = 0; i < this.slot.length; i++ ) {
            if ( this.slot[i] !== undefined ) {
                this.slot[i].setPosition( new cc.Point ( pos.x, pos.y - ( 43 * ( 1 + i ) ) ) );
                this.addChild( this.slot[i] );
                this.slot[i].scheduleUpdate();
            }
        }
    }
});
