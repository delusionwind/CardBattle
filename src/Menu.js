var Menu = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.logo = cc.Sprite.create( 'res/images/battleBar.jpg' );
        this.logo.setPosition( new cc.Point( 400, 500 ) );
        this.addChild( this.logo );

        this.info = cc.LabelTTF.create( " START GAME\n[PRESS ENTER]", 'ITC Stone Serif LT Italic', 40 );
        this.info.setPosition( new cc.Point( 400, 300 ) );
        this.addChild( this.info );

        this.gameLayer = new GameLayer();

        this.addKeyboardHandlers();
        this.scheduleUpdate();
        return true;

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
        if ( keyCode == 13 ) {
            this.gameLayer.init();
            this.addChild( this.gameLayer );
        }
    }
});

var MenuScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new Menu();
        layer.init();
        this.addChild( layer );
    }
});