var Card = cc.Sprite.extend({
    ctor: function( element, power ) {
        this._super();
        if ( element == "Fire" ) {
            this.initWithFile( 'res/images/card_fire.jpg' );
        } else if ( element == "Ice" ) {
            this.initWithFile( 'res/images/card_ice.jpg' );
        } else if ( element == "Thunder" ) {
            this.initWithFile( 'res/images/card_thunder.jpg' );
        } else if ( element == "Rock" ) {
            this.initWithFile( 'res/images/card_rock.jpg' );
        } else {
            this.initWithFile( 'res/images/card_0.jpg' );
        }
        this.chosen = false;
        this.element = element;
        this.power = power;
        this.powerLabel = cc.LabelTTF.create( this.power, 'Arial', 20 );
        var pos = this.getPosition();
        this.powerLabel.setPosition( new cc.Point( pos.x + 45, pos.y + 60 ) );
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
