var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.battleStatus = new BattleStatus();
        this.battleStatus.setPosition( new cc.Point( 540, 315 ) );
        this.addChild( this.battleStatus );
        this.battleStatus.scheduleUpdate();
        this.addKeyboardHandlers();
        this.scheduleUpdate();
        return true;
    },
    update: function( dt ) {

    },
    fullHandDraw: function() {
        this.cardSlot = new Array(5);
        for( var i = 0; i < this.cardSlot.length; i++ ) {
            /*if ( typeof this.cardSlot[i] !== 'undefined' ) {
                this.removeChild( this.cardSlot[i] );
            }*/
            this.cardSlot[i] = new Card();
            var point = new cc.Point( 525 + ( ( i - 2 ) * 100 ), 200 );
            this.cardSlot[i].setPosition( point );
            this.addChild( this.cardSlot[i] );
            this.cardSlot[i].scheduleUpdate();
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
        if ( keyCode == 49 || keyCode == 97 ) {
            this.cardSlot[0].select();
        } else if ( keyCode == 50 || keyCode == 98) {
            this.cardSlot[1].select();
        } else if ( keyCode == 51 || keyCode == 99) {
            this.cardSlot[2].select();
        } else if ( keyCode == 52 || keyCode == 100) {
            this.cardSlot[3].select();
        } else if ( keyCode == 53 || keyCode == 101) {
            this.cardSlot[4].select();
        }
        if ( keyCode == 32 ) {
            this.fullHandDraw();
        }
        console.log(keyCode);
    },
    onKeyUp: function( keyCode, event ) {

    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});
