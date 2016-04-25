var Player = cc.Node.extend({
    ctor: function( name, hp ) {
        this._super();
        var pos = this.getPosition();
        this.name = name;
        this.maxHP = hp;
        this.health = this.maxHP;

        this.nameLabel = cc.LabelTTF.create( this.name, 'ITC Stone Serif LT Italic', 20 );
        this.nameLabel.setPosition( new cc.Point( pos.x, pos.y + 40 ) );
        this.addChild( this.nameLabel );

        this.HPLabel = cc.LabelTTF.create( this.health+"/"+this.maxHP, 'ITC Stone Serif LT Italic', 20 );
        this.HPLabel.setPosition( new cc.Point( pos.x, pos.y ) );
        this.addChild( this.HPLabel );
    },
    receiveDamage: function( damage ) {
        this.health -= damage;
        this.HPLabel.setString( this.health+"/"+this.maxHP );
    }
});
