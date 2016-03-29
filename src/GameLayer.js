var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.card1 = new Card( "Thunder", 5 );
        this.card1.setPosition( new cc.Point( 750, 150 ));
        this.addChild( this.card1, 0 );
        this.card2 = new Card( "Fire", 5 );
        this.card2.setPosition( new cc.Point( 650, 150 ));
        this.addChild( this.card2, 0 );
        this.card3 = new Card( "Ice", 5 );
        this.card3.setPosition( new cc.Point( 550, 150 ));
        this.addChild( this.card3, 0 );
        this.card4 = new Card( "Rock", 5 );
        this.card4.setPosition( new cc.Point( 450, 150 ));
        this.addChild( this.card4, 0 );
        this.card5 = new Card( "-", 5 );
        this.card5.setPosition( new cc.Point( 350, 150 ));
        this.addChild( this.card5, 0 );
        this.card1.scheduleUpdate();
        this.card2.scheduleUpdate();
        this.card3.scheduleUpdate();
        this.card4.scheduleUpdate();
        this.card5.scheduleUpdate();
        this.addKeyboardHandlers();
        this.scheduleUpdate();
        return true;
    },
    update: function( dt ) {

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
            this.card1.select();
        } else if ( keyCode == 50 || keyCode == 98) {
            this.card2.select();
        } else if ( keyCode == 51 || keyCode == 99) {
            this.card3.select();
        } else if ( keyCode == 52 || keyCode == 100) {
            this.card4.select();
        } else if ( keyCode == 53 || keyCode == 101) {
            this.card5.select();
        }
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
