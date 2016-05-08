var Enemy = Player.extend({
    ctor: function( name, hp, element ) {
        this._super( name, hp );
        var pos = this.getPosition();
        this.picture = cc.Sprite.create( 'res/images/card_0.jpg' );
        this.picture.setPosition( new cc.Point( pos.x - 150, pos.y ));
        this.addChild( this.picture );
        this.timer = 0;

        this.element = element;
        this.fire = 0;
        this.ice = 0;
        this.thunder = 0;
        this.rock = 0;
        this.astral = 0;

        this.elementLabel = new Array(5);
        for( var i = 0; i < this.elementLabel.length; i++ ) {
            this.elementLabel[i] = cc.LabelTTF.create( "", 'ITC Stone Serif LT Italic', 18 );
            this.elementLabel[i].setPosition( new cc.Point( ( ( i - 2 ) * 100 ) - 175, pos.y - 120 ) );
            this.addChild( this.elementLabel[i] );
        }
    },
    update: function( dt ) {
        this.timer++;
    },
    randomMovePower: function() {
        var power = Math.floor( Math.random() * 5 );
        this.elementLabel[2].setString( "SPEED: " + power );
        return power;
    },
    attack: function() {

    },
    defense: function( elementDamage ) {
        if ( this.element == "Fire" ) {
            this.fire = Math.floor( Math.random() * 10 );
            this.ice = Math.floor( this.fire / 2 );
        }
        if ( this.element == "Ice" ) {
            this.ice = Math.floor( Math.random() * 10 );
            this.rock = Math.floor( this.ice / 2 );
        }
        if ( this.element == "Thunder" ) {
            this.thunder = Math.floor( Math.random() * 10 );
            this.fire = Math.floor( this.thunder / 2 );
        }
        if ( this.element == "Rock" ) {
            this.rock = Math.floor( Math.random() * 10 );
            this.thunder = Math.floor( this.rock / 2 );
        }
        this.showElementPower();
        var damage = 0;
        for (var i = 0; i < elementDamage.length; i++) {
            if ( elementDamage[i] > this.elementList()[i] ) {
                damage += elementDamage[i] - this.elementList()[i];
            }
        }
        this.timer = 0;
        this.receiveDamage( damage );
        //this.clearElementLabel();
    },
    showElementPower: function() {
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
    clearElementLabel: function() {
        this.fire = 0;
        this.ice = 0;
        this.thunder = 0;
        this.rock = 0;
        this.astral = 0;
        for ( var i = 0; i < 5; i++ ) {
          this.elementLabel[i].setString("");
        }
    },
    elementList: function() {
        return [ this.fire, this.ice, this.thunder, this.rock, this.astral];
    }
});
