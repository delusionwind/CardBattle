var Card = cc.Sprite.extend({
    ctor: function() {
        this._super();
        var elementList = [ "Fire", "Ice", "Thunder", "Rock", "Astral" ];
        var randInt = Math.floor( Math.random() * 5 );
        this.chosen = false;
        this.element = elementList[randInt];
        if ( this.element == "Fire" ) {
            this.initWithFile( 'res/images/card_fire.jpg' );
        } else if ( this.element == "Ice" ) {
            this.initWithFile( 'res/images/card_ice.jpg' );
        } else if ( this.element == "Thunder" ) {
            this.initWithFile( 'res/images/card_thunder.jpg' );
        } else if ( this.element == "Rock" ) {
            this.initWithFile( 'res/images/card_rock.jpg' );
        } else {
            this.initWithFile( 'res/images/card_0.jpg' );
        }
        this.power = Math.ceil( Math.random() * 5 );
        this.powerLabel = cc.LabelTTF.create( this.power, 'ITC Stone Serif LT Italic', 30 );
        var pos = this.getPosition();
        this.powerLabel.setPosition( new cc.Point( pos.x + 45, pos.y + 80 ) );
        this.addChild( this.powerLabel );
    },
    update: function( dt ) {
        var pos = this.getPosition();
        if ( this.chosen == true ) {
            this.setPosition( new cc.Point( pos.x, pos.y + this.upLength ) );
            this.upLength = 0;
        } else if ( this.chosen == false ) {
            this.setPosition( new cc.Point( pos.x, pos.y - this.upLength ) );
            this.upLength = 0;
        }

    },
    select: function( dt ) {
        this.upLength = 40;
        if ( this.chosen == false ) {
            this.chosen = true;
        } else {
            this.chosen = false;
        }
    }

});
