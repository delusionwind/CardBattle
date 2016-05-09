var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.backGround = cc.Sprite.create( 'res/images/space.jpg' );
        this.backGround.setPosition( new cc.Point( 400, 300 ) );
        this.addChild( this.backGround );

        this.enemy = new Enemy( "Dragon", 60, "Fire" );
        this.enemy.setPosition( new cc.Point( 700, 500 ) );
        this.addChild( this.enemy, 0 );
        this.enemy.update();
        this.enemy.scheduleUpdate();

        this.battleStatus = new BattleStatus();
        this.battleStatus.setPosition( new cc.Point( 540, 315 ) );
        this.addChild( this.battleStatus );
        this.battleStatus.scheduleUpdate();

        this.skills = new SkillList();
        this.skills.setPosition( new cc.Point( 110, 570 ) );
        this.addChild( this.skills );
        this.skills.scheduleUpdate();

        this.deck = new Deck();
        this.deck.setPosition( new cc.Point( 60, 0 ) );
        this.addChild( this.deck );
        this.deck.scheduleUpdate();

        this.player = new Player( "Player", 50 );
        this.player.setPosition( new cc.Point( 80, 150 ) );
        this.addChild( this.player );
        this.player.scheduleUpdate();

        this.help = cc.Sprite.create( 'res/images/howToPlay.jpg' );
        this.help.setPosition( new cc.Point( 400, 300 ) );
        this.addChild( this.help );
        this.help.setVisible( false );

        this.cardSlot = new Array(5);

        this.phase = GameLayer.PHASE.START;
        this.phaseEnded = 0;
        this.phaseAction = true;
        this.damage = 0;
        this.enemyAttack = 0;
        this.enemyMovePower = 0;

        this.addKeyboardHandlers();
        this.scheduleUpdate();
        return true;
    },
    fullHandDraw: function() {
        for( var i = 0; i < this.cardSlot.length; i++ ) {
            if ( this.cardSlot[i] === undefined && this.deck.remainingCard > 0) {
                this.cardSlot[i] = new Card();
                this.deck.drawCard();
                var point = new cc.Point( 525 + ( ( i - 2 ) * 100 ), 0 );
                this.cardSlot[i].setPosition( point );
                this.addChild( this.cardSlot[i] );
                this.cardSlot[i].scheduleUpdate();
            }
        }
    },
    addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed : function( keyCode, event ) {
                self.onKeyDown( keyCode, event );
            },
        }, this);
    },
    onKeyDown: function( keyCode, event ) {
        if ( keyCode == 72 ) {
            if ( this.help.isVisible() == false ) {
                this.help.setVisible( true );
            } else {
                this.help.setVisible( false );
            }
        } else if ( this.phase == GameLayer.PHASE.WIN || this.phase == GameLayer.PHASE.GAMEOVER ) {
            if ( keyCode == 32 ) {
                cc.director.runScene ( new MenuScene() );
            }
        } else if ( this.phaseAction == false ) {
            if ( keyCode == 49 || keyCode == 97 ) {
                this.selectExistingCard(0);
            } else if ( keyCode == 50 || keyCode == 98) {
                this.selectExistingCard(1);
            } else if ( keyCode == 51 || keyCode == 99) {
                this.selectExistingCard(2);
            } else if ( keyCode == 52 || keyCode == 100) {
                this.selectExistingCard(3);
            } else if ( keyCode == 53 || keyCode == 101) {
                this.selectExistingCard(4);
            } else if ( keyCode == 32 ) {
                if ( this.phase == GameLayer.PHASE.ATTACK) {
                    this.damage = this.enemy.defense( this.battleStatus.elementList() );
                    this.battleStatus.attackResult( this.damage );
                    this.phaseAction = true;
                } else if ( this.phase == GameLayer.PHASE.DEFENSE ) {
                    this.damage = this.battleStatus.defense( this.enemyAttack );
                    this.battleStatus.defenseResult( this.damage );
                    this.phaseAction = true;
                } else if ( this.phase == GameLayer.PHASE.MOVE ) {
                    this.enemyMovePower = this.enemy.randomMovePower();
                    this.battleStatus.moveResult( this.enemyMovePower );
                    this.phaseAction = true;
                }
            }
        } else if ( this.phaseAction == true ) {
            if ( keyCode == 32 ) {
                if ( this.phase == GameLayer.PHASE.START ) {
                    this.fullHandDraw();
                }
                this.endPhase();
            }
        }
    },
    endPhase: function() {
        this.skills.clearSkill();
        this.phaseAction = false;
        this.enemy.clearElementLabel();
        this.removeSelectedCard();
        if ( this.phase == GameLayer.PHASE.START ) {
            this.startNewTurn();
        } else if ( this.phase == GameLayer.PHASE.MOVE ) {
            if ( this.battleStatus.calculateAttacker( this.enemyMovePower ) >= 0 ) {
                this.phase = GameLayer.PHASE.ATTACK;
            } else {
                this.phase = GameLayer.PHASE.DEFENSE;
            }
        } else if ( this.phase == GameLayer.PHASE.ATTACK ) {
            this.phaseEnded++;
            this.enemy.receiveDamage( this.damage );
            if ( this.phaseEnded < 2 ) {
                this.phase = GameLayer.PHASE.DEFENSE;
            } else {
                this.startNewTurn();
            }
        } else if ( this.phase == GameLayer.PHASE.DEFENSE ) {
            this.phaseEnded++;
            this.player.receiveDamage( this.damage );
            if ( this.phaseEnded < 2 ) {
                this.phase = GameLayer.PHASE.ATTACK;
            } else {
                this.startNewTurn();
            }
        }
        if ( this.phase == GameLayer.PHASE.DEFENSE ) {
            this.battleStatus.clearElementPower();
            this.enemyAttack = this.enemy.attack( 5 - this.phaseEnded );
        }
        if ( this.enemy.health <= 0 ) {
            this.phase = GameLayer.PHASE.WIN;
        } else if ( this.player.health <= 0 ) {
            this.phase = GameLayer.PHASE.GAMEOVER;
        }
        this.battleStatus.changePhase( this.phase );

    },
    startNewTurn: function() {
        this.phaseEnded = 0;
        this.phase = GameLayer.PHASE.MOVE;
        this.enemy.randomElement();
        this.fullHandDraw();
    },
    selectExistingCard: function( slot ) {
        if ( this.cardSlot[slot] !== undefined ) {
            this.cardSlot[slot].select();
            if ( this.phase == GameLayer.PHASE.MOVE ) {
                this.battleStatus.updateSpeed( this.cardSlot, this.skills );
            } else {
                this.battleStatus.updateElementPower( this.cardSlot, this.skills, this.phase );
            }
        }
    },
    removeSelectedCard: function() {
        for ( var i = 0; i < this.cardSlot.length; i++ ) {
            if ( this.cardSlot[i] !== undefined && this.cardSlot[i].chosen == true ) {
                this.removeChild( this.cardSlot[i] );
                this.cardSlot[i] = undefined;
            }
        }
    }

});

GameLayer.PHASE = {
    START: 1,
    MOVE: 2,
    ATTACK: 3,
    DEFENSE: 4,
    WIN: 5,
    GAMEOVER: 6
};

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});
