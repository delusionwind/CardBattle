var SkillList = cc.Node.extend({
    ctor: function() {
        this._super();
        this.name = "";
        var pos = this.getPosition();

        this.label = new cc.LabelTTF.create( "SKILLS", 'ITC Stone Serif LT Italic', 30 );
        this.label.setPosition( new cc.Point ( pos.x, pos.y ) );
        this.addChild( this.label );

        this.fire = 0;
        this.ice = 0;
        this.thunder = 0;
        this.rock = 0;
        this.astral = 0;

        this.slot = new Array(10);
        this.slot[0] = new Skill( "[MOV]", "Lightning FLASH", "SPEED+20", "THUNDER:1+" );
        this.slot[1] = new Skill( "[ATK]", "Flame BLAST    ", "FIRE+8", "FIRE:4+" );
        this.slot[2] = new Skill( "[ATK]", "Stone PILLAR   ", "ROCK+8", "ROCK:4+" );
        this.slot[3] = new Skill( "[ATK]", "Thunder BOLT   ", "THUNDER+4", "THUNDER:3+" );
        this.slot[4] = new Skill( "[ATK]", "Space VOID     ", "ASTRAL+10", "ASTRAL:4+" );
        this.slot[5] = new Skill( "[DEF]", "Ice WALL       ", "ICE+5,ROCK+3", "ICE:3+" );
        this.slot[6] = new Skill( "[DEF]", "Dark MATTER    ", "FIRE+6,ICE+6,THUNDER+6,ROCK+6,", "ASTRAL:5+" );

        for( var i = 0; i < this.slot.length; i++ ) {
            if ( this.slot[i] !== undefined ) {
                this.slot[i].setPosition( new cc.Point ( pos.x, pos.y - ( 43 * ( 1 + i ) ) ) );
                this.slot[i].posY = pos.y - ( 43 * ( 1 + i ) );
                this.addChild( this.slot[i] );
                this.slot[i].scheduleUpdate();
            }
        }
    },
    movePhaseUpdate: function( handPower ) {
        this.clearSkill();
        if ( handPower[2] > 0 ) {
            this.slot[0].active();
            this.thunder += 20;
        }
        return this.thunder;
    },
    attackPhaseUpdate: function( handPower, phase ) {
        this.clearSkill();
        if ( phase == GameLayer.PHASE.ATTACK ) {
            if ( handPower[0] > 3 ) {
                this.slot[1].active();
                this.fire += 8;
            }
            if ( handPower[3] > 3 ) {
                this.slot[2].active();
                this.rock += 8;
            }
            if ( handPower[2] > 2 ) {
                this.slot[3].active();
                this.thunder += 4;
            }
            if ( handPower[4] > 3 ) {
                this.slot[4].active();
                this.astral += 10;
            }
        } else {
            if ( handPower[1] > 2 ) {
                this.slot[5].active();
                this.ice += 5;
                this.rock += 3;
            }
            if ( handPower[4] > 4 ) {
                this.fire += 6;
                this.ice += 6;
                this.thunder += 6;
                this.rock += 6;
            }
        }
        return this.skillPower();

    },
    clearSkill: function() {
        this.fire = 0;
        this.ice = 0;
        this.thunder = 0;
        this.rock = 0;
        this.astral = 0;
        for( var i = 0; i < this.slot.length; i++ ) {
            if ( this.slot[i] !== undefined ) {
                if ( this.slot[i].activated == true ) {
                    this.slot[i].deactive();
                }
            }
        }
    },
    skillPower: function() {
        return [this.fire, this.ice, this.thunder, this.rock, this.astral];
    }
});
