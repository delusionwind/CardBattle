var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.battleStatus = new BattleStatus();
        this.battleStatus.setPosition( new cc.Point( 540, 315 ) );
        this.addChild( this.battleStatus );
        this.cardSlot = new Array(5);
        this.phase = GameLayer.PHASE.DRAW;
        this.battleStatus.scheduleUpdate();
        this.addKeyboardHandlers();
        this.scheduleUpdate();
        return true;
    },
    update: function( dt ) {

    },
    fullHandDraw: function() {
        for( var i = 0; i < this.cardSlot.length; i++ ) {
            if ( this.cardSlot[i] === undefined ) {
                this.cardSlot[i] = new Card();
                var point = new cc.Point( 525 + ( ( i - 2 ) * 100 ), 200 );
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
            onKeyReleased: function( keyCode, event ) {
                self.onKeyUp( keyCode, event );
            }
        }, this);
    },
    onKeyDown: function( keyCode, event ) {
        if ( this.phase == GameLayer.PHASE.DRAW ) {
            if ( keyCode == 32 ) {
                this.phase = GameLayer.PHASE.MOVE;
                this.battleStatus.changePhase( this.phase );
                this.fullHandDraw();
            }
        } else if ( this.phase != GameLayer.PHASE.DRAW ) {
            if ( keyCode == 49 || keyCode == 97 ) {
                if ( this.cardSlot[0] !== undefined ) {
                    this.cardSlot[0].select();
                }
            } else if ( keyCode == 50 || keyCode == 98) {
                if ( this.cardSlot[1] !== undefined ) {
                    this.cardSlot[1].select();
                }
            } else if ( keyCode == 51 || keyCode == 99) {
                if ( this.cardSlot[2] !== undefined ) {
                    this.cardSlot[2].select();
                }
            } else if ( keyCode == 52 || keyCode == 100) {
                if ( this.cardSlot[3] !== undefined ) {
                    this.cardSlot[3].select();
                }
            } else if ( keyCode == 53 || keyCode == 101) {
                if ( this.cardSlot[4] !== undefined ) {
                    this.cardSlot[4].select();
                }
            } else if ( keyCode == 32 ) {
                for ( var i = 0; i < this.cardSlot.length; i++ ) {
                    if ( this.cardSlot[i] !== undefined && this.cardSlot[i].chosen == true ) {
                        this.removeChild( this.cardSlot[i] );
                        this.cardSlot[i] = undefined;
                    }
                }
                this.phase++;
                if ( this.phase > 4 ) {
                    this.phase = GameLayer.PHASE.DRAW;
                }
                this.battleStatus.changePhase( this.phase );
            }
        }
        console.log(this.phase);
    },
    onKeyUp: function( keyCode, event ) {

    }
});

GameLayer.PHASE = {
    DRAW: 1,
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
