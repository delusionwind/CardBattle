var Menu = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.backGround = cc.Sprite.create( 'res/images/space.jpg' );
        this.backGround.setPosition( new cc.Point( 400, 300 ) );
        this.addChild( this.backGround );

        this.logo = cc.Sprite.create( 'res/images/logo.png' );
        this.logo.setPosition( new cc.Point( 400, 500 ) );
        this.addChild( this.logo );

        this.info = cc.LabelTTF.create( " START GAME\n[PRESS ENTER]", 'ITC Stone Serif LT Italic', 40 );
        this.info.setPosition( new cc.Point( 400, 150 ) );
        this.addChild( this.info );

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
            cc.director.runScene ( new StartScene() );
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
