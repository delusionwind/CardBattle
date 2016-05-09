var BattleStatus = cc.Node.extend({
    ctor: function() {
        this._super();
        this.barBackground = cc.Sprite.create( 'res/images/battleBar.jpg' );
        this.addChild( this.barBackground );
        var pos = this.getPosition();
        this.phaseLabel = cc.LabelTTF.create( "START PHASE", 'ITC Stone Serif LT Italic', 25 );
        this.phaseLabel.setPosition( new cc.Point( pos.x - 40, pos.y ) );
        this.addChild( this.phaseLabel );

        this.infoLabel = cc.LabelTTF.create( "HELP[H]  SELECT CARD[1-5]  START/OK/ENDPHASE[SPACEBAR]", 'ITC Stone Serif LT Italic', 18 );
        this.infoLabel.setPosition( new cc.Point( pos.x - 20, pos.y - 30 ) );
        this.addChild( this.infoLabel );

        this.speed = 0;
        this.fire = 0;
        this.ice = 0;
        this.thunder = 0;
        this.rock = 0;
        this.astral = 0;

        this.elementLabel = new Array(5);
        for( var i = 0; i < this.elementLabel.length; i++ ) {
            this.elementLabel[i] = cc.LabelTTF.create( "", 'ITC Stone Serif LT Italic', 18 );
            this.elementLabel[i].setPosition( new cc.Point( ( ( i - 2 ) * 100 ) - 20, pos.y - 120 ) );
            this.addChild( this.elementLabel[i] );
        }
    },
    moveResult: function( enemyMovePower, skill ) {
        if ( this.calculateAttacker( enemyMovePower ) >= 0 ) {
            this.phaseLabel.setString( "Player Attack first" );
        } else {
            this.phaseLabel.setString( "Enemy Attack first" );
        }
    },
    attackResult: function( damage ) {
        this.phaseLabel.setString( "Player deal " + damage + " damage to enemy" );
    },
    defenseResult: function( damage ) {
        this.phaseLabel.setString( "Player receive "+ damage + " damage" );
    },
    updateSpeed: function( hand, skills ) {
        this.clearElementPower();
        for( var i = 0; i < hand.length; i++ ) {
            if ( hand[i] !== undefined && hand[i].chosen == true ) {
                this.speed += hand[i].power;
                if ( hand[i].element == "Thunder" ) {
                    this.thunder += hand[i].power;
                }
            }
        }
        this.speed += skills.movePhaseUpdate( this.elementList() );
        this.elementLabel[2].setString( "SPEED: " + this.speed );
    },
    updateElementPower: function( hand, skills, phase ) {
        this.clearElementPower();
        for( var i = 0; i < hand.length; i++ ) {
            if ( hand[i] !== undefined && hand[i].chosen == true ) {
                if ( hand[i].element == "Fire" ) {
                    this.fire += hand[i].power;
                } else if ( hand[i].element == "Ice" ) {
                    this.ice += hand[i].power;
                } else if ( hand[i].element == "Thunder" ) {
                    this.thunder += hand[i].power;
                } else if ( hand[i].element == "Rock" ) {
                    this.rock += hand[i].power;
                } else {
                    this.astral += hand[i].power;
                }
            }
        }
        var skillPower = skills.attackPhaseUpdate( this.elementList(), phase );
        this.fire += skillPower[0];
        this.ice += skillPower[1];
        this.thunder += skillPower[2];
        this.rock += skillPower[3];
        this.astral += skillPower[4];
        this.updateElementLabel();
    },
    updateElementLabel: function() {
        if ( this.fire > 0 ) {
            this.elementLabel[0].setString( "Fire\n" + this.fire );
        }
        if ( this.ice > 0 ) {
            this.elementLabel[1].setString( "Ice\n" + this.ice );
        }
        if ( this.thunder > 0 ) {
            this.elementLabel[2].setString( "Thunder\n" + this.thunder );
        }
        if ( this.rock > 0 ) {
            this.elementLabel[3].setString( "Rock\n" + this.rock );
        }
        if ( this.astral > 0 ) {
            this.elementLabel[4].setString( "Astral\n" + this.astral );
        }
    },
    defense: function( enemyElement ) {
        var damage = 0;
        for (var i = 0; i < enemyElement.length; i++) {
            if ( enemyElement[i] > this.elementList()[i] ) {
                damage += enemyElement[i] - this.elementList()[i];
            }
        }
        return damage;
    },
    clearElementPower: function() {
        this.speed = 0;
        this.fire = 0;
        this.ice = 0;
        this.thunder = 0;
        this.rock = 0;
        this.astral = 0;
        for( var i = 0; i < this.elementLabel.length; i++ ) {
            this.elementLabel[i].setString("");
        }
    },

    changePhase: function( phase ) {
        this.clearElementPower();
        if ( phase == 1 ) {
            this.phaseLabel.setString( "START PHASE" );
        } else if ( phase == 2 ) {
            this.phaseLabel.setString( "MOVE PHASE" );
        } else if ( phase == 3 ) {
            this.phaseLabel.setString( "ATTACK PHASE" );
        } else if ( phase == 4 ) {
            this.phaseLabel.setString( "DEFENSE PHASE" );
        } else if ( phase == 5 ) {
            this.phaseLabel.setString( "YOU WIN" );
        } else if ( phase == 6 ) {
            this.phaseLabel.setString( "You Lose GAMEOVER" );
        }
    },

    calculateAttacker: function( enemyMoves ) {
        return this.speed - enemyMoves;
    },
    sumOfElement: function() {
        return this.fire + this.ice + this.thunder + this.rock + this.astral;
    },
    elementList: function() {
        return [this.fire, this.ice, this.thunder, this.rock, this.astral];
    }
});
