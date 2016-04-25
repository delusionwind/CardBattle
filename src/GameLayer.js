var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.battleStatus = new BattleStatus();
        this.battleStatus.setPosition( new cc.Point( 540, 315 ) );
        this.addChild( this.battleStatus );
        this.battleStatus.scheduleUpdate();

        this.deck = new Deck();
        this.deck.setPosition( new cc.Point( 60, 0 ) );
        this.addChild( this.deck );
        this.deck.scheduleUpdate();

        this.player = new Player( "New Player", 50 );
        this.player.setPosition( new cc.Point( 80, 200 ) );
        this.addChild( this.player );
        this.player.scheduleUpdate();

        this.enemy = new Enemy( "New Enemy", 50 );
        this.enemy.setPosition( new cc.Point( 600, 500 ) );
        this.addChild( this.enemy );
        this.enemy.scheduleUpdate();

        this.cardSlot = new Array(5);

        this.phase = GameLayer.PHASE.START;
        this.phaseEnded = 0;

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
            /*onKeyReleased: function( keyCode, event ) {
                self.onKeyUp( keyCode, event );
            }*/
        }, this);
    },
    onKeyDown: function( keyCode, event ) {
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
            if ( this.phase == GameLayer.PHASE.START ) {
                this.fullHandDraw();
            }
            this.endPhase();
        }
    },
    endPhase: function() {
        this.removeSelectedCard();
        if ( this.phase == GameLayer.PHASE.START ) {
            this.startNewTurn();
        } else if ( this.phase == GameLayer.PHASE.MOVE ) {
            if ( this.battleStatus.calculateAttacker( /*toBeChanged*/3 ) >= 0 ) {
                this.phase = GameLayer.PHASE.ATTACK;
            } else {
                this.phase = GameLayer.PHASE.DEFENSE;
            }
        } else if ( this.phase == GameLayer.PHASE.ATTACK ) {
            this.phaseEnded++;
            if ( this.phaseEnded < 2 ) {
                this.phase = GameLayer.PHASE.DEFENSE;
            } else {
                this.startNewTurn();
            }
        } else if ( this.phase == GameLayer.PHASE.DEFENSE ) {
            this.phaseEnded++;
            if ( this.phaseEnded < 2 ) {
                this.phase = GameLayer.PHASE.ATTACK;
            } else {
                this.startNewTurn();
            }
        }
        this.battleStatus.changePhase( this.phase );
    },
    startNewTurn: function() {
        this.phaseEnded = 0;
        this.phase = GameLayer.PHASE.MOVE;
        this.fullHandDraw();
    },
    selectExistingCard: function( slot ) {
        if ( this.cardSlot[slot] !== undefined ) {
            this.cardSlot[slot].select();
            this.battleStatus.updateElementPower( this.cardSlot );
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
    DEFENSE: 4
};

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});
