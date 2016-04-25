var Enemy = Player.extend({
    ctor: function( name, hp ) {
        this._super( name, hp );
        var pos = this.getPosition();

        this.moveLabel = cc.LabelTTF.create( "", 'ITC Stone Serif LT Italic', 20 );
        this.moveLabel.setPosition( new cc.Point( pos.x, pos.y - 60 ) );
        this.addChild( this.moveLabel );
    },
    randomMovePower: function() {
        var power = Math.floor( Math.random() * 5 );
        this.moveLabel.setString( "SPEED: " + power );
        return power;
    },
    attack: function() {

    },
    defense: function( elementDamage ) {
        var damage = 0;
        for (var i = 0; i < elementDamage.length; i++) {
          damage += elementDamage[i]
        }
        this.receiveDamage( damage );
    }
});
